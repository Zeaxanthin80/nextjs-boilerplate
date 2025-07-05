import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// This is the configuration object for NextAuth
import { getServerSession } from "next-auth/next";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development"
};

// Server-side auth function
export async function auth() {
  return await getServerSession(authOptions);
}

// Client-side auth utilities
export const signIn = async (...args) => {
  if (typeof window !== 'undefined') {
    const { signIn: clientSignIn } = await import('next-auth/react');
    return clientSignIn(...args);
  }
  throw new Error('signIn should be called from the client side');
};

export const signOut = async (...args) => {
  if (typeof window !== 'undefined') {
    const { signOut: clientSignOut } = await import('next-auth/react');
    return clientSignOut(...args);
  }
  throw new Error('signOut should be called from the client side');
};

import "./globals.css";
import AuthSessionProvider from "./components/SessionProvider";

export const metadata = {
  title: "Marketing SaaS",
  description: "Marketing SaaS Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="color-flow">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}

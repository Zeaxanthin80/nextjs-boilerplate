"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({
        callbackUrl: "/", // Redirect to home page after sign out
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed ${
        loading
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-gray-600 hover:bg-gray-700 text-white"
      }`}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Signing out...
        </span>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}

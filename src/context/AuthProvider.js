"use client";  // Mark as a client component since SessionProvider relies on client-side session handling
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
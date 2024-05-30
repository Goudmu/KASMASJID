import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import HeaderOwn from "@/components/own/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/own/provider/AuthProvider";
import React, { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={cn(
            "min-h-screen bg-slate-50 font-sans antialiased",
            fontSans.variable
          )}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <HeaderOwn />
          </Suspense>
          {children}
          <ToastContainer
            position="bottom-right"
            theme="light"
            autoClose={1500}
          />
        </body>
      </AuthProvider>
    </html>
  );
}

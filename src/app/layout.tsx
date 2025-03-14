"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

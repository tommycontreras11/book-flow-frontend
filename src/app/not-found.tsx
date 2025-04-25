"use client";

import { Button } from "@/components/ui/button";
import {
    Toast,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [path, setPath] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);

      // Show toast notification after a short delay
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto py-4">
            <div className="flex items-center text-sm text-neutral-500">
              <Link
                href="/"
                className="hover:text-primary-700 transition-colors duration-200"
              >
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-neutral-400">Error</span>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="font-medium text-neutral-800">
                Page Not Found
              </span>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-12 flex flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-light text-primary-800 mb-8">
              Page Not Found
            </h1>

            <Link href="/">
              <Button
                size="lg"
                className="bg-primary-800 hover:bg-primary-900 text-black dark:text-white font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </main>

        <footer className="bg-neutral-100 border-t border-neutral-200 py-8">
          <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
            <p>&copy; 2025 Loan Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {showToast && (
        <Toast className="bg-white border-l-4 border-primary-700">
          <ToastTitle className="text-primary-800">Navigation Help</ToastTitle>
          <ToastDescription className="text-neutral-600">
            The page you requested could not be found. We've suggested some
            popular destinations above to help you get back on track.
          </ToastDescription>
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
}

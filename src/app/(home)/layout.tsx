// "use client";

// import { AppSidebar } from "@/components/ui/app-sidebar";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/toaster";

// export default function HomeLayout({
//      children,
//    }: Readonly<{
//      children: React.ReactNode;
//    }>) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           {children}
//           <Toaster />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }

import './../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/ui/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookFlow - Your Digital Library',
  description: 'Discover and borrow books from your library',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
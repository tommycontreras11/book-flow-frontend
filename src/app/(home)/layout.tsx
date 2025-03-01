"use client";

import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <QuickStatsCard quickStats={[
              {
                id: "1",
                title: "Total Books",
                value: 100,
                type: "total",
              },
              {
                id: "2",
                title: "Available Books",
                value: 80,
                type: "available",
              },
              {
                id: "3",
                title: "Borrowed Books",
                value: 20,
                type: "borrowed",
              },
            ]}/>
            <RecentActivitiesCard activities={[
              {
                id: "1",
                title: "The Great Gatsby",
                timestamp: "2023-08-01",
                type: "borrowed",
              },
              {
                id: "2",
                title: "1984",
                timestamp: "2023-08-01",
                type: "returned",
              },
              {
                id: "3",
                title: "John Doe",
                timestamp: "2023-08-01",
                type: "registered",
              },
            ]} />
            <TopBorrowedBooksCard books={[
              {
                id: "1",
                title: "The Great Gatsby",
                borrowCount: 10,
              },
              {
                id: "2",
                title: "1984",
                borrowCount: 8,
              },
              {
                id: "3",
                title: "Brave New World",
                borrowCount: 6,
              },
            ]} />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

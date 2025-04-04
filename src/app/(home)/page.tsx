"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
import { toast } from "@/hooks/use-toast";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";
import { useMemo } from "react";

export default function Home() {
  const { user } = useAuth();
  const isEmployee = useMemo(() => user?.role === "EMPLOYEE", [user]);

  const {
    data: books,
    error: bookError,
    isLoading: isLoadingBook,
    refetch,
  } = useGetAllBook();

  const {
    data: booksStats,
    error: bookStatError,
    isLoading: isLoadingBookStat,
  } = useGetAllBookStat(user?.role === "EMPLOYEE");
  
  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const handleRequestBook = async (bookUUID: string) => {
    if (!user || isEmployee) {
      toast({
        title: "Error",
        description: "You must login first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    saveRequest({ bookUUID, userUUID: user.uuid });
    refetch();
  };

  return (
    <>
      {!isLoadingBookStat && isEmployee && booksStats && (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <>
            <QuickStatsCard quickStats={booksStats?.quickStats || []} />
            <RecentActivitiesCard
              activities={booksStats?.recentActivities || []}
            />
            <TopBorrowedBooksCard books={booksStats?.topBorrowedBooks || []} />
          </>
        </div>
      )}
      <div className="flex-1 rounded-xl md:min-h-min flex justify-center md:justify-start">
        <div className="w-full max-w-6xl flex flex-wrap gap-4 items-center md:items-start justify-center md:justify-start">
          {!isLoadingBook &&
            books
              ?.filter(
                (book) =>
                  !book.requests.length ||
                  book?.requests.every(
                    (request) => request?.user?.uuid !== user?.uuid
                  )
              )
              .map((book) => (
                <BookCard
                  key={book.uuid}
                  book={book}
                  user={user || undefined}
                  handleSubmit={() => handleRequestBook(book.uuid)}
                />
              ))}
        </div>
      </div>
    </>
  );
}

"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
import { useToast } from "@/hooks/use-toast";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast()
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

  useEffect(() => {
  }, [books, isLoadingBook, isEmployee, user]);

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        console.log(data.message);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleRequestBook = async (bookUUID: string) => {
    if (!user || isEmployee) {
      alert("You must login first");
      return;
    }
    saveRequest({ bookUUID, userUUID: user.uuid });
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
                  book?.requests.some(
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

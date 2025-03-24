"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";
import { useEffect, useMemo } from "react";

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
  } = useGetAllBookStat();

  useEffect(() => {}, [books, isLoadingBook, isEmployee]);

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
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {!isLoadingBookStat && isEmployee && booksStats && (
          <>
            <QuickStatsCard quickStats={booksStats?.quickStats || []} />
            <RecentActivitiesCard
              activities={booksStats?.recentActivities || []}
            />
            <TopBorrowedBooksCard books={booksStats?.topBorrowedBooks || []} />
          </>
        )}
      </div>
      <div className="min-h-[40vh] flex-1 rounded-xl md:min-h-min">
        <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-4 items-start justify-start">
          {!isLoadingBook &&
            books?.map((book) => (
              <BookCard
                key={book.uuid}
                book={book}
                userUUID={user?.uuid}
                handleSubmit={() => handleRequestBook(book.uuid)}
              />
            ))}
        </div>
      </div>
    </>

    // <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-4 justify-left">
    //   {(user?.role === UserRoleEnum.USER || !user) && books.map((book) => (
    //     <BookCard
    //       key={book.uuid}
    //       book={book}
    //       userUUID={user?.uuid}
    //       handleSubmit={() => handleRequestBook(book.uuid)}
    //     />
    //   ))}
    // </div>
  );
}

"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook } from "@/hooks/api/book.hook";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";

export default function Home() {
  const { user } = useAuth();

  const {
    data: books,
    error: bookError,
    isLoading: isLoadingBook,
    refetch
  } = useGetAllBook();

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        console.log(data.message);
        refetch()
      })
      .catch((err) => console.log(err));
  };

  const handleRequestBook = async (bookUUID: string) => {
    if (!user) {
      alert("You must login first");
      return;
    }
    saveRequest({ bookUUID, userUUID: user.uuid });
  };

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <QuickStatsCard
          quickStats={[
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
          ]}
        />
        <RecentActivitiesCard
          activities={[
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
          ]}
        />
        <TopBorrowedBooksCard
          books={[
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
          ]}
        />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-4 items-start justify-start">
          {!isLoadingBook && books?.map((book) => (
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

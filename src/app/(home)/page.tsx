"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
import { useGetAllScience } from "@/hooks/api/science.hook";
import { toast } from "@/hooks/use-toast";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";
import { IBookFilter } from "@/providers/http/books/interface";
import { bookFilterSchema } from "@/schema/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [science, setScience] = useState<string | null>(null);
  const isEmployee = useMemo(() => user?.role === "EMPLOYEE", [user]);

  const [filterFields, setFilterFields] = useState<IFormField[]>([]);

  const form = useForm<IBookFilter>({
    resolver: zodResolver(bookFilterSchema),
    defaultValues: {
      science: "",
    },
  });

  const {
    data: books,
    error: bookError,
    isLoading: isLoadingBook,
    refetch,
  } = useGetAllBook(science);

  const isAnyBookAvailable = useMemo(
    () =>
      !!books?.filter(
        (book) =>
          !book.requests.length ||
          book?.requests.every((request) => request?.user?.uuid !== user?.uuid)
      )?.length,
    [books]
  );

  const { data: sciences, isLoading: isLoadingSciences } = useGetAllScience();

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

  const handleSubmit = ({ science }: IBookFilter) => {
    if (!science) return;

    setScience(science);
    form.reset();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isLoadingSciences) return;

    setFilterFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "science")) {
        return [
          ...prevFields,
          {
            name: "science",
            label: "Science",
            type: "select",
            options: [
              {
                label: "All",
                value: "All",
              },
              ...(sciences?.map((science) => ({
                label: science.name,
                value: science.name,
              })) || []),
            ],
          },
        ];
      }
      return prevFields;
    });
  }, [sciences]);

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

      <div className={`flex flex-col ${isAnyBookAvailable ? "items-end" : "items-center"} w-full max-w-6xl mx-auto px-4`}>
        {/* Filter Button */}
        {/* <div className="mb-3">
          <Button
            className="hover:text-sky-800 text-sky-700 font-bold py-2 px-4 rounded"
            variant={"outline"}
            onClick={() => setIsModalOpen(true)}
          >
            <SlidersHorizontal className="mr-2" />
            Filter
          </Button>
        </div> */}

        {isAnyBookAvailable ? (
          <>
            <div className="mb-3">
              <Button
                className="hover:bg-sky-800 bg-sky-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                <SlidersHorizontal className="mr-2" />
                Filter
              </Button>
            </div>
            <CreateUpdateForm<IBookFilter>
              isEditable={false}
              entityName="Filters"
              fields={filterFields}
              form={form}
              onSubmit={handleSubmit}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
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
                    <div key={book.uuid} className="w-full">
                      <BookCard
                        book={book}
                        user={user || undefined}
                        handleSubmit={() => handleRequestBook(book.uuid)}
                      />
                    </div>
                  ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl text-center font-medium mb-6">
            No books available
          </h2>
        )}
      </div>
    </>
  );
}

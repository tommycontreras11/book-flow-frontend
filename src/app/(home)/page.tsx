"use client";

import BookCard from "@/components/common/card/book";
import { QuickStatsCard } from "@/components/common/card/quick-stats";
import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
import { Filter } from "@/components/common/filter/filter";
import { IFormField } from "@/components/common/modal/create-update";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
import { useGetAllScience } from "@/hooks/api/science.hook";
import { toast } from "@/hooks/use-toast";
import { useCreateRequest } from "@/mutations/api/requests";
import { IBookFilter } from "@/providers/http/books/interface";
import { ICreateRequest } from "@/providers/http/requests/interface";
import { bookFilterSchema } from "@/schema/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [science, setScience] = useState<string | null>(null);
  const [filterFields, setFilterFields] = useState<IFormField[]>([]);

  const isEmployee = useMemo(() => user?.role === "EMPLOYEE", [user]);

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

  const { mutate: createRequest } = useCreateRequest();

  const {
    data: booksStats,
    error: bookStatError,
    isLoading: isLoadingBookStat,
  } = useGetAllBookStat(user?.role === "EMPLOYEE");

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request);
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
  };

  const handleSubmit = ({ science }: IBookFilter) => {
    if (!science) return;

    setScience(science);
    form.reset();
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setScience(null);
  };

  useEffect(() => {
    if (isLoadingSciences || !sciences) return;

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
              ...sciences.map((science) => ({
                label: science.name,
                value: science.name,
              })),
            ],
          },
        ];
      }
      return prevFields;
    });
  }, [isLoadingSciences, sciences]);

  return (
    <>
      {!isLoadingBookStat && isEmployee && (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <QuickStatsCard quickStats={booksStats?.quickStats || []} />
          <RecentActivitiesCard
            activities={booksStats?.recentActivities || []}
          />
          <TopBorrowedBooksCard books={booksStats?.topBorrowedBooks || []} />
        </div>
      )}

      <div className={`flex flex-col w-full max-w-6xl mx-auto px-4`}>
        <>
          {!isLoadingBook && (
            <>
              {isAnyBookAvailable && (
                <>
                  <div className="mb-3">
                    <div className="flex justify-end items-end">
                      {science ? (
                        <Button
                          className="hover:bg-sky-800 bg-sky-700 text-white font-bold py-2 px-4 rounded"
                          onClick={resetFilters}
                        >
                          <Trash className="mr-2" />
                          Reset filters
                        </Button>
                      ) : (
                        <Filter<IBookFilter>
                          isEditable={false}
                          entityName="Filters"
                          fields={filterFields}
                          form={form}
                          onSubmit={handleSubmit}
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          setIsModalOpen={() => setIsModalOpen(true)}
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      {!isLoadingBook &&
                        books &&
                        books
                          .filter(
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
                                handleSubmit={() =>
                                  handleRequestBook(book.uuid)
                                }
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                </>
              )}

              {books?.length === 0 && (
                <h2 className="text-2xl text-center font-medium mb-6">
                  No books available
                </h2>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
}

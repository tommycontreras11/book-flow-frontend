// "use client";

// import BookCard from "@/components/common/card/book";
// import { QuickStatsCard } from "@/components/common/card/quick-stats";
// import { RecentActivitiesCard } from "@/components/common/card/recent-activities";
// import { TopBorrowedBooksCard } from "@/components/common/card/top-borrowed-books";
// import { Filter } from "@/components/common/filter/filter";
// import { IFormField } from "@/components/common/modal/create-update";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/auth-context";
// import { useGetAllBook, useGetAllBookStat } from "@/hooks/api/book.hook";
// import { useGetAllScience } from "@/hooks/api/science.hook";
// import { toast } from "@/hooks/use-toast";
// import { useCreateRequest } from "@/mutations/api/requests";
// import { IBookFilter } from "@/providers/http/books/interface";
// import { ICreateRequest } from "@/providers/http/requests/interface";
// import { bookFilterSchema } from "@/schema/book.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Trash } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useForm } from "react-hook-form";

// export default function Home() {
//   const { user } = useAuth();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [science, setScience] = useState<string | null>(null);
//   const [filterFields, setFilterFields] = useState<IFormField[]>([]);

//   const isEmployee = useMemo(() => user?.role === "EMPLOYEE", [user]);

//   const form = useForm<IBookFilter>({
//     resolver: zodResolver(bookFilterSchema),
//     defaultValues: {
//       science: "",
//     },
//   });

//   const {
//     data: books,
//     error: bookError,
//     isLoading: isLoadingBook,
//   } = useGetAllBook(science);

//   const isAnyBookAvailable = useMemo(
//     () =>
//       !!books?.filter(
//         (book) =>
//           !book.requests.length ||
//           book?.requests.every((request) => request?.user?.uuid !== user?.uuid)
//       )?.length,
//     [books]
//   );

//   const { data: sciences, isLoading: isLoadingSciences } = useGetAllScience();

//   const { mutate: createRequest } = useCreateRequest();

//   const {
//     data: booksStats,
//     error: bookStatError,
//     isLoading: isLoadingBookStat,
//   } = useGetAllBookStat(user?.role === "EMPLOYEE");

//   const saveRequest = (request: ICreateRequest) => {
//     createRequest(request);
//   };

//   const handleRequestBook = async (bookUUID: string) => {
//     if (!user || isEmployee) {
//       toast({
//         title: "Error",
//         description: "You must login first",
//         variant: "destructive",
//         duration: 3000,
//       });
//       return;
//     }
//     saveRequest({ bookUUID, userUUID: user.uuid });
//   };

//   const handleSubmit = ({ science }: IBookFilter) => {
//     if (!science) return;

//     setScience(science);
//     form.reset();
//     setIsModalOpen(false);
//   };

//   const resetFilters = () => {
//     setScience(null);
//   };

//   useEffect(() => {
//     if (isLoadingSciences || !sciences) return;

//     setFilterFields((prevFields) => {
//       if (!prevFields.find((field) => field.name === "science")) {
//         return [
//           ...prevFields,
//           {
//             name: "science",
//             label: "Science",
//             type: "select",
//             options: [
//               {
//                 label: "All",
//                 value: "All",
//               },
//               ...sciences.map((science) => ({
//                 label: science.name,
//                 value: science.name,
//               })),
//             ],
//           },
//         ];
//       }
//       return prevFields;
//     });
//   }, [isLoadingSciences, sciences]);

//   return (
//     <>
//       {!isLoadingBookStat && isEmployee && (
//         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//           <QuickStatsCard quickStats={booksStats?.quickStats || []} />
//           <RecentActivitiesCard
//             activities={booksStats?.recentActivities || []}
//           />
//           <TopBorrowedBooksCard books={booksStats?.topBorrowedBooks || []} />
//         </div>
//       )}

//       <div className={`flex flex-col w-full max-w-6xl mx-auto px-4`}>
//         <>
//           {!isLoadingBook && (
//             <>
//               {isAnyBookAvailable && (
//                 <>
//                   <div className="mb-3">
//                     <div className="flex justify-end items-end mb-3">
//                       {science ? (
//                         <Button
//                           className="hover:bg-sky-800 bg-sky-700 text-white font-bold py-2 px-4 rounded"
//                           onClick={resetFilters}
//                         >
//                           <Trash className="mr-2" />
//                           Reset filters
//                         </Button>
//                       ) : (
//                         <Filter<IBookFilter>
//                           isEditable={false}
//                           entityName="Filters"
//                           fields={filterFields}
//                           form={form}
//                           onSubmit={handleSubmit}
//                           isOpen={isModalOpen}
//                           onClose={() => setIsModalOpen(false)}
//                           setIsModalOpen={() => setIsModalOpen(true)}
//                         />
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
//                       {!isLoadingBook &&
//                         books &&
//                         books
//                           .filter(
//                             (book) =>
//                               !book.requests.length ||
//                               book?.requests.every(
//                                 (request) => request?.user?.uuid !== user?.uuid
//                               )
//                           )
//                           .map((book) => (
//                             <div key={book.uuid} className="w-full">
//                               <BookCard
//                                 book={book}
//                                 user={user || undefined}
//                                 handleSubmit={() =>
//                                   handleRequestBook(book.uuid)
//                                 }
//                               />
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {books?.length === 0 && (
//                 <h2 className="text-2xl text-center font-medium mb-6">
//                   No books available
//                 </h2>
//               )}
//             </>
//           )}
//         </>
//       </div>
//     </>
//   );
// }

"use client";

import BookCard from "@/components/common/card/book";
import { IFormField } from "@/components/common/modal/create-update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBook } from "@/hooks/api/book.hook";
import { toast } from "@/hooks/use-toast";
import { useCreateRequest } from "@/mutations/api/requests";
import { ICreateRequest } from "@/providers/http/requests/interface";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {
  const { user } = useAuth();

  const [search, setSearch] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [filterFields, setFilterFields] = useState<IFormField[]>([]);

  const isEmployee = useMemo(() => user?.role === "EMPLOYEE", [user]);

  const {
    data: books,
    error: bookError,
    isLoading: isLoadingBook,
  } = useGetAllBook(search);

  const isAnyBookAvailable = useMemo(
    () =>
      !!books?.filter(
        (book) =>
          !book.requests.length ||
          book?.requests.every((request) => request?.user?.uuid !== user?.uuid)
      )?.length,
    [books]
  );

  // const { data: sciences, isLoading: isLoadingSciences } = useGetAllScience();

  const { mutate: createRequest } = useCreateRequest();

  // const {
  //   data: booksStats,
  //   error: bookStatError,
  //   isLoading: isLoadingBookStat,
  // } = useGetAllBookStat(user?.role === "EMPLOYEE");

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Your Next Book</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Browse through our collection of books and find your next reading
          adventure. Borrow books easily and manage your loans all in one place.
        </p>
        <div className="flex w-full max-w-lg gap-2">
          <Input
            placeholder="Search by title, author, or genre..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" onClick={() => setSearch(inputValue)}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {books &&
          books
            .filter(
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
                isAnyBookAvailable={isAnyBookAvailable}
                handleSubmit={() => handleRequestBook(book.uuid)}
              />
            ))}
      </div>
    </div>
  );
}

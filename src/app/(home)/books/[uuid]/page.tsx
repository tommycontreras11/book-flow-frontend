"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useGetOneBook } from "@/hooks/api/book.hook";
import { toast } from "@/hooks/use-toast";
import { useCreateRequest } from "@/mutations/api/requests";
import { ICreateRequest } from "@/providers/http/requests/interface";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

export default function BookDetails({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = React.use(params);

  const { data: book, isLoading: isLoadingBook } = useGetOneBook(uuid);
  const { user } = useAuth();

  const isRegularUser = useMemo(() => user?.role === "USER", [user]);
  const isBookAvailable = useMemo(
    () =>
      !book?.requests?.length ||
      book?.requests?.every((request) => request?.user?.uuid !== user?.uuid),
    [book]
  );

  const { mutate: createRequest } = useCreateRequest();

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request);
  };

  const handleRequestBook = async (bookUUID: string) => {
    if (!user || !isRegularUser) {
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

  if (!isLoadingBook && !book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return !isLoadingBook && book ? (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
            <img
              src={book.url}
              alt={book.name}
              className="object-cover w-full h-full"
            />
          </div>
          {(isRegularUser || !user) && (
            <Button
              className="w-full"
              onClick={() => handleRequestBook(book.uuid)}
            >
              Request Book
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
            <div className="flex flex-wrap gap-2 text-muted-foreground">
              {book.authors.map((author, index) => (
                <span key={author.uuid}>
                  {author.name}
                  {index < book.authors.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span
                  className={
                    isBookAvailable
                      ? "text-green-600 dark:text-green-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }
                >
                  {book.status.charAt(0).toUpperCase() +
                    book.status.slice(1).toLowerCase()}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Published
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {new Date(book.publishedDate).toLocaleDateString()}
              </CardContent>
            </Card>
          </div>

          <div className="prose dark:prose-invert">
            <h2 className="text-xl font-semibold mb-2">About this book</h2>
            <p>{book.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Pages</dt>
                  <dd>{book.pages}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Language</dt>
                  <dd>{book.language.name}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-medium mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((g) => (
                  <span
                    key={g.uuid}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

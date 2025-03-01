"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

type Book = {
  id: string;
  title: string;
  borrowCount: number;
};

interface TopBorrowedBooksCardProps {
  books: Book[];
}

export function TopBorrowedBooksCard({ books }: TopBorrowedBooksCardProps) {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold">Top Borrowed Books</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  "{book.title}"
                </p>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {book.borrowCount} {book.borrowCount === 1 ? "time" : "times"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

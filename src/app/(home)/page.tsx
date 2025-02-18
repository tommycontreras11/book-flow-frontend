"use client";

import BookCard from "@/components/common/card/book";
import { IMeUser } from "@/interfaces/auth.interface";
import { IBook } from "@/interfaces/book.interface";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateRequest } from "@/interfaces/request.interface";
import { me } from "@/lib/auth.lib";
import { getAllBook } from "@/lib/book.lib";
import { createRequest } from "@/lib/request.lib";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<IMeUser>();
  const [books, setBooks] = useState<IBook[]>([]);

  const fetchData = async () => {
    try {
      const [userRes, booksRes] = await Promise.all([me(), getAllBook()]);
      setUser(userRes.data);
      setBooks(booksRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        fetchData();
        console.log(data.message);
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
    <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
      {books.map((book) => (
        <BookCard
          key={book.uuid}
          book={book}
          userUUID={user?.uuid}
          handleSubmit={() => handleRequestBook(book.uuid)}
        />
      ))}
    </div>
  );
}

"use client";

import { IMeUser } from "@/interfaces/auth.interface";
import { me } from "@/lib/auth.lib";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ICreateRequest } from "@/interfaces/request.interface";
import { createRequest } from "@/lib/request.lib";
import { IMessage } from "@/interfaces/message.interface";
import { IBook } from "@/interfaces/book.interface";
import { getAllBook } from "@/lib/book.lib";
import { UserRoleEnum } from "@/enums/common.enum";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookCard from "@/components/common/card/book";

export default function Home() {
  const [user, setUser] = useState<IMeUser>();
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, booksRes] = await Promise.all([me(), getAllBook()]);
        setUser(userRes.data);
        setBooks(booksRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleRequestBook = async (bookUUID: string) => {
    console.log(bookUUID)
    // if (!user) return;
    // saveRequest({ bookUUID, userUUID: user.uuid });
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      {books.map((book) => (
        <BookCard key={book.uuid} name={book.name} url={""} handleSubmit={() => handleRequestBook(book.uuid)} />
      ))}
    </div>
  );
}

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
    if (!user) return;
    saveRequest({ bookUUID, userUUID: user.uuid });
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      {user?.role === UserRoleEnum.EMPLOYEE && (
        <>
          <p>{user.name}</p>
          <p>{user.role}</p>
          <a href="/language">Go to language page</a>
          <br />
          <a href="/bibliography-type">Go to bibliography type page</a>
          <br />
          <a href="/science">Go to science page</a>
          <br />
          <a href="/publisher">Go to publisher page</a>
          <br />
          <a href="/author">Go to author page</a>
          <br />
          <a href="/book">Go to book page</a>
          <br />
          <a href="/request">Go to request page</a>
          <br />
          <a href="/auth/signIn">Go to signIn page</a>
        </>
      )}

      {user?.role === UserRoleEnum.USER && (
        <>
          <p>{user.name}</p>
          <p>{user.role}</p>
        </>
      )}

      <Table>
        <TableCaption>Books List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.uuid}>
              <TableCell>{book.description}</TableCell>

              <TableCell>
                {user?.role === UserRoleEnum.USER && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleRequestBook(book.uuid)}
                      >
                        Request book
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

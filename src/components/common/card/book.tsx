import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { cn } from "@/lib/utils";
import { IMeUser } from "@/providers/http/auth/interface";
import { IBook } from "@/providers/http/books/interface";
import { IRequest } from "@/providers/http/requests/interface";
import Link from "next/link";
import { useMemo } from "react";

export default function BookCard({
  book,
  request,
  user,
  isRequestToAcceptOrDeny = false,
  handleSubmit,
  handleDenySubmit,
}: {
  book: IBook;
  request?: IRequest;
  user?: IMeUser | null;
  isRequestToAcceptOrDeny?: boolean;
  handleSubmit?: () => void;
  handleDenySubmit?: () => void;
}) {
  let isAnyBookAvailable =
    book?.requests?.find((request) => request.user?.uuid === user?.uuid)
      ?.status || request?.status;

  const isEmployee = useMemo(
    () => (user == null ? null : user.role === UserRoleEnum.EMPLOYEE),
    [user]
  );

  if (isEmployee) {
    isAnyBookAvailable = request?.status;
  }

  return (
    <Card key={book.uuid} className="overflow-hidden">
      <Link href={`/books/${book.uuid}`}>
        <div className="aspect-[3/3] relative">
          <img
            src={book.url}
            alt={book.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{book.name}</CardTitle>
          <p className="text-muted-foreground">{book.authors[0].name}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-sm",
                !isAnyBookAvailable
                  ? "text-green-600 dark:text-green-400"
                  : isAnyBookAvailable === StatusRequestEnum.APPROVAL
                  ? "text-blue-600 dark:text-blue-400"
                  : isAnyBookAvailable === StatusRequestEnum.PENDING
                  ? "text-yellow-600 dark:text-yellow-400"
                  : isAnyBookAvailable === StatusRequestEnum.BORROWED
                  ? "text-orange-600 dark:text-orange-400"
                  : isAnyBookAvailable === StatusRequestEnum.COMPLETED
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              )}
            >
              {!isAnyBookAvailable
                ? "Available"
                : isAnyBookAvailable === StatusRequestEnum.APPROVAL
                ? "Pending to Borrow"
                : isAnyBookAvailable === StatusRequestEnum.PENDING
                ? "Pending Approval Request"
                : isAnyBookAvailable === StatusRequestEnum.BORROWED
                ? "On Loan"
                : isAnyBookAvailable === StatusRequestEnum.COMPLETED
                ? "Completed"
                : "Pending Return Request"}
            </span>
          </div>
        </CardContent>
      </Link>
      {((!isEmployee && !isAnyBookAvailable) || isEmployee === null) && (
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Request Book
          </Button>
        </CardFooter>
      )}

      {isAnyBookAvailable === StatusRequestEnum.APPROVAL &&
        !isEmployee &&
        request && (
          <CardFooter>
            <div className="mt-auto flex justify-end items-center text-sm text-gray-500 dark:text-gray-400">
              <Button className="w-full" onClick={handleSubmit}>
                Borrow
              </Button>
            </div>
          </CardFooter>
        )}

      {isEmployee && isRequestToAcceptOrDeny && (
        <CardFooter>
          <div className="mt-auto flex justify-between items-center w-full text-sm text-gray-500 dark:text-gray-400">
            <div>
              <Button onClick={handleSubmit}>Approve</Button>
            </div>
            <div className="flex-grow" />
            <div>
              <Button onClick={handleDenySubmit}>Deny</Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

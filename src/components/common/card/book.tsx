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

export default function BookCard({
  book,
  request,
  user,
  isRequestToAcceptOrDeny = false,
  isAnyBookAvailable = false,
  handleSubmit,
  handleDenySubmit,
}: {
  book: IBook;
  request?: IRequest;
  user?: IMeUser | null;
  isRequestToAcceptOrDeny?: boolean;
  isAnyBookAvailable?: boolean;
  handleSubmit?: () => void;
  handleDenySubmit?: () => void;
}) {
  const isRegularUser = user?.role === UserRoleEnum.USER;

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
                isAnyBookAvailable
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
              )}
            >
              {book.status.charAt(0).toUpperCase() +
                book.status.slice(1).toLowerCase()}
            </span>
          </div>
        </CardContent>
      </Link>
      {isAnyBookAvailable && (
        <CardFooter>
          {((isRegularUser && !request) || !user) && (
            <Button className="w-full" onClick={handleSubmit}>
              Request Book
            </Button>
          )}

          {request?.status === StatusRequestEnum.APPROVAL &&
            isRegularUser &&
            request && (
              <div className="mt-auto flex justify-end items-center text-sm text-gray-500 dark:text-gray-400">
                <Button className="w-full" onClick={handleSubmit}>Borrow</Button>
              </div>
            )}

          {!isRegularUser && isRequestToAcceptOrDeny && (
            <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <Button onClick={handleSubmit}>Approve</Button>
              <Button onClick={handleDenySubmit}>Deny</Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

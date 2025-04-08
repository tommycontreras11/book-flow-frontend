import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IMeUser } from "@/interfaces/auth.interface";
import { IBook } from "@/providers/http/books/interface";
import { IRequest } from "@/providers/http/requests/interface";

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
  const isRegularUser = user?.role === UserRoleEnum.USER;

  return (
    <div className="w-full min-h-[290px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-gray-950 cursor-pointer">
      <img
        src={book.url}
        alt="Product Image"
        width={200}
        height={200}
        className="w-full h-56 object-cover"
        style={{ aspectRatio: "300/300", objectFit: "cover" }}
      />
      <div className="flex-1 p-4 space-y-2 flex flex-col justify-between">
        <h3 className="text-xl font-semibold">{book.name}</h3>

        {book?.language?.name || book?.publicationYear ? (
          <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            {book?.language?.name && <span>{book.language.name}</span>}
            {book?.publicationYear && (
              <span className="font-bold">{book.publicationYear}</span>
            )}
          </div>
        ) : null}

        {((isRegularUser && !request) || !user) && (
          <Button onClick={handleSubmit}>Request Book</Button>
        )}

        {(request?.status === StatusRequestEnum.APPROVAL ||
          request?.status === StatusRequestEnum.BORROWED) &&
          isRegularUser &&
          request && (
            <div className="mt-auto flex justify-end items-center text-sm text-gray-500 dark:text-gray-400">
              <Button onClick={handleSubmit}>
                {request?.status === StatusRequestEnum.APPROVAL
                  ? "Borrow"
                  : "Return"}
              </Button>
            </div>
          )}

        {user?.role === UserRoleEnum.EMPLOYEE && isRequestToAcceptOrDeny && (
          <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <Button onClick={handleSubmit}>Approve</Button>
            <Button onClick={handleDenySubmit}>Deny</Button>
          </div>
        )}
      </div>
    </div>
  );
}

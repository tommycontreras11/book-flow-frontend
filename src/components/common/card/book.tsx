import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IBook } from "@/interfaces/book.interface";

export default function BookCard({
  book,
  userUUID,
  handleSubmit,
}: {
  book: IBook;
  userUUID?: string | null;
  handleSubmit: () => void;
}) {
  const userBook = book?.requests?.find(
    (request) => request?.user?.uuid === userUUID
  );
  const isOwnedByUser = userBook?.book?.uuid === book.uuid;

  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
      <img
        src={book.url}
        alt="Product Image"
        width={300}
        height={300}
        className="w-full h-64 object-cover"
        style={{ aspectRatio: "300/300", objectFit: "cover" }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{book.name}</h3>
        <p className="text-gray-500 dark:text-gray-400">
          This is a description of the product.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{book.publicationYear}</span>
          {user?.role === UserRoleEnum.USER && (
            <Button disabled={isOwnedByUser} onClick={handleSubmit}>
              {isOwnedByUser
                ? userBook?.status != StatusRequestEnum.DENIED &&
                  userBook?.status != StatusRequestEnum.PENDING
                  ? "Owned by you"
                  : "Pending to approval"
                : "Request book"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

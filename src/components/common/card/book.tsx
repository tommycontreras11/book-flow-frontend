import { Button } from "@/components/ui/button";
import { UserRoleEnum } from "@/enums/common.enum";
import { IMeUser } from "@/interfaces/auth.interface";
import { IBook } from "@/providers/http/books/interface";

export default function BookCard({
  book,
  user,
  handleSubmit,
}: {
  book: IBook;
  user?: IMeUser | null;
  handleSubmit: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
      <img
        src={book.url}
        alt="Product Image"
        width={200}
        height={200}
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
            <Button onClick={handleSubmit}>
              Request book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

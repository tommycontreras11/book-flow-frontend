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
    <div className="w-[300px] min-h-[320px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-gray-950 cursor-pointer">
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

        <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{book.language.name}</span>
          <span className="font-bold">{book.publicationYear}</span>
        </div>

        {user?.role === UserRoleEnum.USER && (
          <Button onClick={handleSubmit} className="w-full">
            Request Book
          </Button>
        )}
      </div>
    </div>
  );
}

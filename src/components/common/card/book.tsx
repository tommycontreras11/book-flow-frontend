import { Button } from "@/components/ui/button"
import { ICardBook } from "./interface/book"

export default function BookCard({ name, url, handleSubmit }: ICardBook) {
  return (
    <div className="w-full max-w-md mx-auto">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
      <img
        src={"https://picsum.photos/200/300"}
        alt="Product Image"
        width={500}
        height={400}
        className="w-full h-64 object-cover"
        style={{ aspectRatio: "500/400", objectFit: "cover" }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">This is a description of the product.</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">$49.99</span>
          <Button onClick={handleSubmit}>Request book</Button>
        </div>
      </div>
    </div>
  </div>
  )
}


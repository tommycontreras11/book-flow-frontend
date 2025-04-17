import { ArrowLeft, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { books } from "@/lib/books"

export default function BookDetails({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === Number(params.id))

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
            <img 
              src={book.cover} 
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>
          <Button className="w-full" disabled={book.status !== "Available"}>
            {book.status === "Available" ? "Borrow Book" : "Join Waitlist"}
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <div className="flex flex-wrap gap-2 text-muted-foreground">
              {book.authors.map((author, index) => (
                <span key={author}>
                  {author}
                  {index < book.authors.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className={book.status === "Available" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-yellow-600 dark:text-yellow-400"
                }>
                  {book.status}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Published
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {new Date(book.publishedDate).toLocaleDateString()}
              </CardContent>
            </Card>
          </div>

          <div className="prose dark:prose-invert">
            <h2 className="text-xl font-semibold mb-2">About this book</h2>
            <p>{book.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Pages</dt>
                  <dd>{book.pages}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Language</dt>
                  <dd>{book.language}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-medium mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {book.genre.map(g => (
                  <span 
                    key={g}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
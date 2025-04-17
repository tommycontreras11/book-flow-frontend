"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookMarked, BookOpen, Calendar } from "lucide-react"

const borrowedBooks = [
  {
    id: 1,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop",
    dueDate: "2024-04-15",
    progress: 65,
  },
  {
    id: 2,
    title: "Foundation",
    author: "Isaac Asimov",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    dueDate: "2024-04-20",
    progress: 30,
  },
]

export default function MyBooks() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
      </div>

      <Tabs defaultValue="borrowed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="borrowed">
            <BookOpen className="h-4 w-4 mr-2" />
            Currently Borrowed
          </TabsTrigger>
          <TabsTrigger value="history">
            <BookMarked className="h-4 w-4 mr-2" />
            Loan History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="borrowed" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {borrowedBooks.map((book) => (
              <Card key={book.id}>
                <div className="flex gap-4 p-6">
                  <div className="w-24 h-32 relative">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl">{book.title}</CardTitle>
                      <p className="text-muted-foreground">{book.author}</p>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Due {new Date(book.dueDate).toLocaleDateString()}
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-muted-foreground mb-1">
                          Reading Progress: {book.progress}%
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 mt-4">
                      <Button variant="outline" className="w-full">Return Book</Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="text-center py-12 text-muted-foreground">
            <BookMarked className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No loan history yet</h3>
            <p>Books you've returned will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
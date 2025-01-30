"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/create";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAuthor } from "@/interfaces/author.interface";
import { IBibliographyType } from "@/interfaces/bibliography-type.interface";
import { IBook, ICreateBook, IUpdateBook } from "@/interfaces/book.interface";
import { ILanguage } from "@/interfaces/language.interface";
import { IMessage } from "@/interfaces/message.interface";
import { IPublisher } from "@/interfaces/publisher.interface";
import { IScience } from "@/interfaces/science.interface";
import { getAllAuthor } from "@/lib/author.lib";
import { getAllBibliographyType } from "@/lib/bibliography-type.lib";
import {
  createBook,
  deleteBook,
  getAllBook,
  getOneBook,
  updateBook,
} from "@/lib/book.lib";
import { getAllLanguage } from "@/lib/language.lib";
import { getAllPublisher } from "@/lib/publisher.lib";
import { getAllScience } from "@/lib/science.lib";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function Book() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBook, setBook] = useState<IUpdateBook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");
  const [bookFields, setBookFields] = useState<IFormField[]>([
    { name: "description", label: "Description", type: "text" },
    { name: "topographical_signature", label: "Topographical Signature", type: "text" },
    { name: "isbn", label: "Isbn", type: "text" },
    { name: "publication_year", label: "Publication Year", type: "number" },
  ]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fetchBooks = async () => {
    getAllBook()
      .then((books) => {
        setBooks(books.data);
        setIsModalOpen(false);
        setBook(null);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let bibliographyTypeOptions: IOptionsFormField[] = [];
    let languageOptions: IOptionsFormField[] = [];
    let scienceOptions: IOptionsFormField[] = [];
    let authorOptions: IOptionsFormField[] = [];
    let publisherOptions: IOptionsFormField[] = [];

    fetchBooks();

    getAllBibliographyType()
      .then((bibliographyTypes) => {
        bibliographyTypeOptions = bibliographyTypes.data.map(
          (bibliographyType: IBibliographyType) => ({
            label: bibliographyType.description,
            value: bibliographyType.uuid,
          })
        );

        setBookFields((prevFields) => [
          ...prevFields,
          {
            name: "bibliographyTypeUUID",
            label: "Bibliography Type",
            type: "select",
            options: bibliographyTypeOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));

    getAllScience()
      .then((sciences) => {
        scienceOptions = sciences.data.map((science: IScience) => ({
          label: science.description,
          value: science.uuid,
        }));

        setBookFields((prevFields) => [
          ...prevFields,
          {
            name: "scienceUUID",
            label: "Science",
            type: "select",
            options: scienceOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));

    getAllAuthor()
      .then((authors) => {
        authorOptions = authors.data.map((author: IAuthor) => ({
          label: author.name,
          value: author.uuid,
        }));

        setBookFields((prevFields) => [
          ...prevFields,
          {
            name: "authorUUIDs",
            label: "Authors",
            type: "multi-select",
            options: authorOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));

    getAllLanguage()
      .then((languages) => {
        languageOptions = languages.data.map((language: ILanguage) => ({
          label: language.description,
          value: language.uuid,
        }));

        setBookFields((prevFields) => [
          ...prevFields,
          {
            name: "languageUUID",
            label: "Language",
            type: "select",
            options: languageOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));

    getAllPublisher()
      .then((publishers) => {
        publisherOptions = publishers.data.map((publisher: IPublisher) => ({
          label: publisher.description,
          value: publisher.uuid,
        }));

        setBookFields((prevFields) => [
          ...prevFields,
          {
            name: "publisherUUID",
            label: "Publisher",
            type: "select",
            options: publisherOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (uuid: string) => {
    deleteBook(uuid)
      .then((data: IMessage) => {
        fetchBooks();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneBook(uuid)
      .then((book) => {
        setBook(book.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyBook = (book: IUpdateBook) => {
    updateBook(uuid, book)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveBook = (book: ICreateBook) => {
    createBook(book)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateBook | IUpdateBook) => {
    formData.publication_year = formData.publication_year ? parseInt(formData.publication_year.toString()) : undefined;

    if (uuid) {
      modifyBook(formData);
      fetchBooks();
      return;
    }

    saveBook(formData as ICreateBook);
    fetchBooks();
  };

  useEffect(() => {}, [bookFields]);

  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-auto">
      <button onClick={() => setIsModalOpen(true)}>Create Book</button>
      <Table>
        <TableCaption>Books List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Topographical Signature</TableHead>
            <TableHead>Isbn</TableHead>
            <TableHead>Publication Year</TableHead>
            <TableHead>Bibliography Type</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Science</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.uuid}>
              <TableCell>{book.uuid}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{book.topographical_signature}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.publication_year}</TableCell>
              <TableCell>{book.bibliographyTypeName}</TableCell>
              <TableCell>{book.publisherName}</TableCell>
              <TableCell>{book.languageName}</TableCell>
              <TableCell>{book.scienceDescription}</TableCell>
              <TableCell>{book.status}</TableCell>

              <TableCell>
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
                    <DropdownMenuItem onClick={() => handleUpdate(book.uuid)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(book.uuid)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <CreateUpdateForm<ICreateBook | IUpdateBook>
          isEditable={!!selectedBook}
          entityName="Book"
          fields={bookFields}
          existingData={selectedBook || {}}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

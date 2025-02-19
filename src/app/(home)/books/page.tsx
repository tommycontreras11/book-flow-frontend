"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
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
import { fillFormInput } from "@/lib/utils";
import { bookFormSchema } from "@/schema/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Book() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState("");
  const [bookFields, setBookFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    {
      name: "topographicalSignature",
      label: "Topographical Signature",
      type: "text",
    },
    { name: "isbn", label: "Isbn", type: "text" },
    { name: "publicationYear", label: "Publication Year", type: "number" },
    { name: "file", label: "File", type: "file" },
  ]);

  const form = useForm<ICreateBook | IUpdateBook>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: "",
      topographicalSignature: "",
      isbn: "",
      publicationYear: 0,
      bibliographyTypeUUID: "",
      publisherUUID: "",
      languageUUID: "",
      scienceUUID: "",
      file: undefined,
    },
  });

  const fetchBooks = async () => {
    getAllBook()
      .then((books) => {
        setBooks(books.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
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
            label: bibliographyType.name,
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
          label: science.name,
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
          label: language.name,
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
          label: publisher.name,
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
        fillFormInput(form, [
          { property: "name", value: book.data.name },
          {
            property: "topographicalSignature",
            value: book.data.topographicalSignature,
          },
          {
            property: "isbn",
            value: book.data.isbn,
          },
          {
            property: "publicationYear",
            value: book.data.publicationYear,
          },
          {
            property: "bibliographyTypeUUID",
            value: book.data.bibliographyTypeUUID,
          },
          {
            property: "publisherUUID",
            value: book.data.publisherUUID,
          },
          {
            property: "languageUUID",
            value: book.data.languageUUID,
          },
          {
            property: "scienceUUID",
            value: book.data.scienceUUID,
          },
          {
            property: "authorUUIDs",
            value: book.data.authorUUIDs,
          },
        ]);
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyBook = (book: FormData) => {
    updateBook(uuid, book)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveBook = (book: FormData) => {
    createBook(book)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (book: ICreateBook | IUpdateBook) => {
    const formData = new FormData();

    bookFields
      .filter((x) => x.name !== "authorUUIDs")
      .forEach((field) => {
        const value =
          book?.[field.name as keyof ICreateBook | keyof IUpdateBook];
        if (value !== undefined && value !== null) {
          formData.append(field.name, value.toString());
        }
      });

    book?.authorUUIDs?.forEach((uuid) =>
      formData.append("authorUUIDs[]", uuid)
    );

    if (book?.file) {
      formData.append("file", book.file);
    }

    if (uuid) {
      modifyBook(formData);
      fetchBooks();
      return;
    }

    saveBook(formData);
    fetchBooks();
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={books}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateBook | IUpdateBook>
        isEditable={isEditable}
        entityName="Book"
        fields={bookFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

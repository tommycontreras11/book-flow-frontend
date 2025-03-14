"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllAuthor } from "@/hooks/api/author.hook";
import { UseGetAllBibliographyType } from "@/hooks/api/bibliography-type.hook";
import { useGetAllBook, useGetOneBook } from "@/hooks/api/book.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import { UseGetAllPublisher } from "@/hooks/api/publisher.hook";
import { useGetAllScience } from "@/hooks/api/science.hook";
import { IAuthor } from "@/interfaces/author.interface";
import { ICreateBook, IUpdateBook } from "@/interfaces/book.interface";
import { ILanguage } from "@/interfaces/language.interface";
import { IMessage } from "@/interfaces/message.interface";
import { IPublisher } from "@/interfaces/publisher.interface";
import { IScience } from "@/interfaces/science.interface";
import {
  createBook,
  deleteBook,
  updateBook,
} from "@/lib/book.lib";
import { fillFormInput } from "@/lib/utils";
import { bookFormSchema } from "@/schema/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Book() {
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

  const {
    data: books,
    error: bookError,
    isLoading: isLoadingBook,
    refetch
  } = useGetAllBook();
  const {
    data: book,
  } = useGetOneBook(uuid || "");
  const { data: bibliographyTypes, isLoading: isLoadingBibliographyType } =
    UseGetAllBibliographyType();
  const { data: languages, isLoading: isLoadingLanguage } = useGetAllLanguage();
  const { data: authors, isLoading: isLoadingAuthor } = useGetAllAuthor();
  const { data: publishers, isLoading: isLoadingPublisher } =
    UseGetAllPublisher();
  const { data: sciences, isLoading: isLoadingScience } = useGetAllScience();

  useEffect(() => {
    let bibliographyTypeOptions: IOptionsFormField[] | undefined = [];
    let languageOptions: IOptionsFormField[] | undefined = [];
    let scienceOptions: IOptionsFormField[] | undefined = [];
    let authorOptions: IOptionsFormField[] | undefined = [];
    let publisherOptions: IOptionsFormField[] | undefined = [];

    if (!isLoadingBibliographyType && bibliographyTypes) {

      bibliographyTypeOptions = bibliographyTypes?.map((bibliographyType) => ({
        label: bibliographyType.name,
        value: bibliographyType.uuid,
      }));

      setBookFields((prevFields) => {
        if (
          !prevFields.some((field) => field.name === "bibliographyTypeUUID")
        ) {
          return [
            ...prevFields,
            {
              name: "bibliographyTypeUUID",
              label: "Bibliography Type",
              type: "select",
              options: bibliographyTypeOptions,
            },
          ];
        }
        return prevFields;
      });
    }

    if (!isLoadingScience && sciences) {
      scienceOptions = sciences?.map((science: IScience) => ({
        label: science.name,
        value: science.uuid,
      }));

      setBookFields((prevFields) => {
        if (!prevFields.some((field) => field.name === "scienceUUID")) {
          return [
            ...prevFields,
            {
              name: "scienceUUID",
              label: "Science",
              type: "select",
              options: scienceOptions,
            },
          ];
        }
        return prevFields;
      });
    }

    if (!isLoadingAuthor && authors) {
      authorOptions = authors?.map((author: IAuthor) => ({
        label: author.name,
        value: author.uuid,
      }));

      setBookFields((prevFields) => {
        if (!prevFields.some((field) => field.name === "authorUUIDs")) {
          return [
            ...prevFields,
            {
              name: "authorUUIDs",
              label: "Authors",
              type: "multi-select",
              options: authorOptions,
            },
          ];
        }
        return prevFields;
      });
    }

    if (!isLoadingLanguage && languages) {
      languageOptions = languages?.map((language: ILanguage) => ({
        label: language.name,
        value: language.uuid,
      }));

      setBookFields((prevFields) => {
        if (!prevFields.some((field) => field.name === "languageUUID")) {
          return [
            ...prevFields,
            {
              name: "languageUUID",
              label: "Language",
              type: "select",
              options: languageOptions,
            },
          ];
        }
        return prevFields;
      });
    }

    if (!isLoadingPublisher && publishers) {
      publisherOptions = publishers?.map((publisher: IPublisher) => ({
        label: publisher.name,
        value: publisher.uuid,
      }));

      setBookFields((prevFields) => {
        if (!prevFields.some((field) => field.name === "publisherUUID")) {
          return [
            ...prevFields,
            {
              name: "publisherUUID",
              label: "Publisher",
              type: "select",
              options: publisherOptions,
            },
          ];
        }
        return prevFields;
      });
    }
  }, [
    books,
    isLoadingBook,
  ]);

  useEffect(() => {
    if(!book) return

    if(isModalOpen && isEditable) {
      fillFormInput(form, [
        { property: "name", value: book.name },
        {
          property: "topographicalSignature",
          value: book.topographicalSignature,
        },
        {
          property: "isbn",
          value: book.isbn,
        },
        {
          property: "publicationYear",
          value: book.publicationYear,
        },
        {
          property: "bibliographyTypeUUID",
          value: book.bibliographyType.uuid,
        },
        {
          property: "publisherUUID",
          value: book.publisher.uuid,
        },
        {
          property: "languageUUID",
          value: book.language.uuid,
        },
        {
          property: "scienceUUID",
          value: book.science.uuid,
        },
        {
          property: "authorUUIDs",
          value: book.authors.map((author) => author.uuid),
        },
      ]);
      
      return;
    }

    form.reset();
    setIsEditable(false);
  })

  const handleDelete = (uuid: string) => {
    deleteBook(uuid)
      .then((data: IMessage) => {
        console.log(data.message);
        refetch()
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => { 
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
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
        refetch()
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (book: ICreateBook | IUpdateBook) => {
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
    } else {
      saveBook(formData);
    }

    refetch();
  };

  if (bookError) return <div>Request Failed</div>;
  if (isLoadingBook) return <div>Loading...</div>;

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={books || []}
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

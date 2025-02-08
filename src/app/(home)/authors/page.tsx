"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/create-update";
import {
  IAuthor,
  ICreateAuthor,
  IUpdateAuthor,
} from "@/interfaces/author.interface";
import { ICountry } from "@/interfaces/country.interface";
import { ILanguage } from "@/interfaces/language.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getOneAuthor,
  updateAuthor,
} from "@/lib/author.lib";
import { getAllCountries } from "@/lib/country.lib";
import { getAllLanguage } from "@/lib/language.lib";
import { formAuthorSchema } from "@/schema/author.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import DataTable from "./table/data-table";

export default function Author() {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");
  const [authorFields, setAuthorFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateAuthor | IUpdateAuthor>({
    resolver: zodResolver(formAuthorSchema),
    defaultValues: {
      name: "",
      birthCountryUUID: "",
      nativeLanguageUUID: "",
    },
  });

  const fetchAuthors = async () => {
    getAllAuthor()
      .then((authors) => {
        setAuthors(authors.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let countryOptions: IOptionsFormField[] = [];
    let languageOptions: IOptionsFormField[] = [];
    fetchAuthors();
    getAllCountries()
      .then((countries) => {
        countryOptions = countries.data.map((country: ICountry) => ({
          label: country.name,
          value: country.uuid,
        }));

        setAuthorFields((prevFields) => [
          ...prevFields,
          {
            name: "birthCountryUUID",
            label: "Birth Country",
            type: "select",
            options: countryOptions,
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

        setAuthorFields((prevFields) => [
          ...prevFields,
          {
            name: "nativeLanguageUUID",
            label: "Native Language",
            type: "select",
            options: languageOptions,
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (uuid: string) => {
    deleteAuthor(uuid)
      .then((data: IMessage) => {
        fetchAuthors();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneAuthor(uuid)
      .then((author) => {
        form.setValue("name", author.data.name);
        form.setValue("birthCountryUUID", author.data.birthCountry.uuid);
        form.setValue("nativeLanguageUUID", author.data.nativeLanguage.uuid);

        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyAuthor = (author: IUpdateAuthor) => {
    updateAuthor(uuid, author)
      .then((data: IMessage) => {
        form.reset();

        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveAuthor = (author: ICreateAuthor) => {
    createAuthor(author)
      .then((data: IMessage) => {
        form.reset();

        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateAuthor | IUpdateAuthor) => {
    if (uuid) {
      modifyAuthor(formData);
      fetchAuthors();
      return;
    }

    saveAuthor(formData as ICreateAuthor);
    fetchAuthors();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={authors}
        columns={columns({ handleUpdate, handleDelete })}
      />

      {isModalOpen && (
        <CreateUpdateForm<ICreateAuthor | IUpdateAuthor>
          isEditable={form.getValues("name") ? true : false}
          entityName="Author"
          fields={authorFields}
          form={form}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

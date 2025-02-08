"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/create-update";
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
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
      <button onClick={() => setIsModalOpen(true)}>Create Author</button>
      <Table>
        <TableCaption>Authors List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Birth Country</TableHead>
            <TableHead>Native Language</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.uuid}>
              <TableCell>{author.uuid}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.birthCountryName}</TableCell>
              <TableCell>{author.nativeLanguageDescription}</TableCell>
              <TableCell>{author.status}</TableCell>

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
                    <DropdownMenuItem onClick={() => handleUpdate(author.uuid)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(author.uuid)}>
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

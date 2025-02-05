"use client";

import {
  ICreateAuthor,
  IAuthor,
  IUpdateAuthor,
} from "@/interfaces/author.interface";
import {
  deleteAuthor,
  getAllAuthor,
  getOneAuthor,
  updateAuthor,
  createAuthor,
} from "@/lib/author.lib";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { IMessage } from "@/interfaces/message.interface";
import { CreateUpdateForm, IFormField, IOptionsFormField } from "@/components/common/create";
import { getAllCountries } from "@/lib/country.lib";
import { ICountry } from "@/interfaces/country.interface";
import { getAllLanguage } from "@/lib/language.lib";
import { ILanguage } from "@/interfaces/language.interface";

export default function Author() {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [selectedAuthor, setAuthor] = useState<IUpdateAuthor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");
  const [authorFields, setAuthorFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fetchAuthors = async () => {
    getAllAuthor()
      .then((authors) => {
        setAuthors(authors.data);
        setIsModalOpen(false);
        setAuthor(null);
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
    let countryOptions: IOptionsFormField[] = []
    let languageOptions: IOptionsFormField[] = []
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
        setAuthor(author.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyAuthor = (author: IUpdateAuthor) => {
    updateAuthor(uuid, author)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveAuthor = (author: ICreateAuthor) => {
    createAuthor(author)
      .then((data: IMessage) => {
        console.log(data.message);
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

  useEffect(() => {
  }, [authorFields]); 

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
          isEditable={!!selectedAuthor}
          entityName="Author"
          fields={authorFields}
          existingData={selectedAuthor || {}}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

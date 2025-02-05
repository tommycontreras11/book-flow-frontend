"use client";

import {
  ICreateLanguage,
  ILanguage,
  IUpdateLanguage,
} from "@/interfaces/language.interface";
import {
  deleteLanguage,
  getAllLanguage,
  getOneLanguage,
  updateLanguage,
  createLanguage,
} from "@/lib/language.lib";
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
import { CreateUpdateForm, IFormField } from "@/components/common/create";

export default function Language() {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [selectedLanguage, setSelectedLanguage] =
    useState<IUpdateLanguage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");

  const languageFields: IFormField[] = [
    { name: "description", label: "Description", type: "text" },
  ];

  const fetchLanguages = async () => {
    getAllLanguage()
      .then((languages) => {
        setLanguages(languages.data);
        setIsModalOpen(false);
        setSelectedLanguage(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteLanguage(uuid)
      .then((data: IMessage) => {
        fetchLanguages();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneLanguage(uuid)
      .then((language) => {
        setSelectedLanguage(language.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyLanguage = (language: IUpdateLanguage) => {
    updateLanguage(uuid, language)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveLanguage = (language: ICreateLanguage) => {
    createLanguage(language)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateLanguage | IUpdateLanguage) => {
    if (uuid) {
      modifyLanguage(formData);
      fetchLanguages();
      return;
    }

    saveLanguage(formData);
    fetchLanguages();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button onClick={() => setIsModalOpen(true)}>Create Language</button>
      <Table>
        <TableCaption>Languages List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((language) => (
            <TableRow key={language.uuid}>
              <TableCell>{language.uuid}</TableCell>
              <TableCell>{language.description}</TableCell>
              <TableCell>{language.status}</TableCell>

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
                    <DropdownMenuItem
                      onClick={() => handleUpdate(language.uuid)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(language.uuid)}
                    >
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
        <CreateUpdateForm<ICreateLanguage | IUpdateLanguage>
          isEditable={!!selectedLanguage}
          entityName="Language"
          fields={languageFields}
          existingData={selectedLanguage || {}}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

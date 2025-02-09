"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  ICreateLanguage,
  ILanguage,
  IUpdateLanguage,
} from "@/interfaces/language.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createLanguage,
  deleteLanguage,
  getAllLanguage,
  getOneLanguage,
  updateLanguage,
} from "@/lib/language.lib";
import { fillFormInput } from "@/lib/utils";
import { languageFormSchema } from "@/schema/language.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Language() {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");
  const languageFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateLanguage | IUpdateLanguage>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchLanguages = async () => {
    getAllLanguage()
      .then((languages) => {
        setLanguages(languages.data);
        setIsModalOpen(false);
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
        fillFormInput(form, [
          { property: "name", value: language.data.name },
        ]);

        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyLanguage = (language: IUpdateLanguage) => {
    updateLanguage(uuid, language)
      .then((data: IMessage) => {
        form.reset();

        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveLanguage = (language: ICreateLanguage) => {
    createLanguage(language)
      .then((data: IMessage) => {
        form.reset();

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
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={languages}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />
      {isModalOpen && (
        <CreateUpdateForm<ICreateLanguage | IUpdateLanguage>
          isEditable={form.getValues("name") ? true : false}
          entityName="Language"
          fields={languageFields}
          form={form}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

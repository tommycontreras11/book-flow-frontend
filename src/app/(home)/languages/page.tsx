"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  useGetAllLanguage,
  useGetOneLanguage,
} from "@/hooks/api/language.hook";
import {
  ICreateLanguage,
  IUpdateLanguage,
} from "@/interfaces/language.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createLanguage,
  deleteLanguage,
  updateLanguage,
} from "@/lib/language.lib";
import { fillFormInput } from "@/lib/utils";
import {
  languageCreateFormSchema,
  languageUpdateFormSchema,
} from "@/schema/language.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { toast } from "@/hooks/use-toast";
import { clearForm } from "@/utils/form";

export default function Language() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const languageFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateLanguage | IUpdateLanguage>({
    resolver: zodResolver(
      isEditable ? languageUpdateFormSchema : languageCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const {
    data: languages,
    error,
    isLoading: isLoadingLanguage,
    refetch,
  } = useGetAllLanguage();
  const { data: language } = useGetOneLanguage(uuid || "");

  useEffect(() => {
    if (isEditable && isModalOpen && language) {
      fillFormInput(form, [{ property: "name", value: language.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [language, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteLanguage(uuid)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000,
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
        refetch();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyLanguage = (language: IUpdateLanguage) => {
    if (!uuid) return;

    updateLanguage(uuid, language)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000,
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const saveLanguage = (language: ICreateLanguage) => {
    createLanguage(language)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000,
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const handleSubmit = async (formData: ICreateLanguage | IUpdateLanguage) => {
    if (uuid) {
      modifyLanguage(formData);
    } else {
      saveLanguage(formData);
    }

    refetch();
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
        data={languages || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateLanguage | IUpdateLanguage>
        isEditable={isEditable}
        entityName="Language"
        fields={languageFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

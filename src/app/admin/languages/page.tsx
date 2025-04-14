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
  useCreateLanguage,
  useDeleteLanguage,
  useUpdateLanguage,
} from "@/mutations/api/languages";
import {
  ICreateLanguage,
  IUpdateLanguage,
} from "@/providers/http/languages/interface";
import {
  languageCreateFormSchema,
  languageUpdateFormSchema,
} from "@/schema/language.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

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
  } = useGetAllLanguage();
  const { data: language } = useGetOneLanguage(uuid || "");

  const { mutate: createLanguage } = useCreateLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateLanguage } = useUpdateLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteLanguage } = useDeleteLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && language) {
      fillFormInput(form, [{ property: "name", value: language.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [language, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteLanguage(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyLanguage = (language: IUpdateLanguage) => {
    if (!uuid) return;
    updateLanguage({ uuid, data: language });
  };

  const saveLanguage = (language: ICreateLanguage) => {
    createLanguage(language);
  };

  const handleSubmit = async (formData: ICreateLanguage | IUpdateLanguage) => {
    if (uuid) {
      modifyLanguage(formData);
    } else {
      saveLanguage(formData);
    }
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

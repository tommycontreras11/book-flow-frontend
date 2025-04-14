"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllAuthor, useGetOneAuthor } from "@/hooks/api/author.hook";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import {
  useCreateAuthor,
  useDeleteAuthor,
  useUpdateAuthor,
} from "@/mutations/api/authors";
import {
  authorCreateFormSchema,
  authorUpdateFormSchema,
} from "@/schema/author.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { ICreateAuthor, IUpdateAuthor } from "@/providers/http/authors/interface";

export default function Author() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [authorFields, setAuthorFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateAuthor | IUpdateAuthor>({
    resolver: zodResolver(
      isEditable ? authorUpdateFormSchema : authorCreateFormSchema
    ),
    defaultValues: {
      name: "",
      birthCountryUUID: "",
      nativeLanguageUUID: "",
    },
  });

  const {
    data: authors,
    error,
    isLoading: isAuthorsLoading
  } = useGetAllAuthor();
  const { data: author } = useGetOneAuthor(uuid || "");
  const { data: countries, isLoading: isCountriesLoading } = useGetAllCountry();
  const { data: languages, isLoading: isLanguagesLoading } =
    useGetAllLanguage();

  const { mutate: createAuthor } = useCreateAuthor(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateAuthor } = useUpdateAuthor(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteAuthor } = useDeleteAuthor(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isCountriesLoading || isLanguagesLoading) return;

    setAuthorFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "birthCountryUUID")) {
        return [
          ...prevFields,
          {
            name: "birthCountryUUID",
            label: "Birth Country",
            type: "select",
            options: countries?.map((country) => ({
              label: country.name,
              value: country.uuid,
            })),
          },
        ];
      }
      return prevFields;
    });

    setAuthorFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "nativeLanguageUUID")) {
        return [
          ...prevFields,
          {
            name: "nativeLanguageUUID",
            label: "Native Language",
            type: "select",
            options: languages?.map((language) => ({
              label: language.name,
              value: language.uuid,
            })),
          },
        ];
      }
      return prevFields;
    });
  }, [countries, isCountriesLoading, languages, isLanguagesLoading]);

  useEffect(() => {
    if (isEditable && isModalOpen && author) {
      fillFormInput(form, [
        { property: "name", value: author.name },
        {
          property: "birthCountryUUID",
          value: author.birthCountry.uuid,
        },
        {
          property: "nativeLanguageUUID",
          value: author.nativeLanguage.uuid,
        },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [author, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteAuthor(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyAuthor = async (author: IUpdateAuthor) => {
    if (!uuid) return;
    updateAuthor({ uuid, data: author });
  };

  const saveAuthor = (author: ICreateAuthor) => {
    createAuthor(author);
  };

  const handleSubmit = async (formData: ICreateAuthor | IUpdateAuthor) => {
    if (uuid) {
      modifyAuthor(formData);
    } else {
      setIsModalOpen(true);
      saveAuthor(formData as ICreateAuthor);
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
        data={authors || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateAuthor | IUpdateAuthor>
        isEditable={isEditable}
        entityName="Author"
        fields={authorFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

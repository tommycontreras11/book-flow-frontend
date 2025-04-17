"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllGenre, useGetOneGenre } from "@/hooks/api/genre.hook";
import {
  useCreateGenre,
  useDeleteGenre,
  useUpdateGenre,
} from "@/mutations/api/genres";
import { ICreateGenre, IUpdateGenre } from "@/providers/http/genres/interface";
import {
  genreCreateFormSchema,
  genreUpdateFormSchema,
} from "@/schema/genre.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Genre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [genreFields, setGenreFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateGenre | IUpdateGenre>({
    resolver: zodResolver(
      isEditable ? genreUpdateFormSchema : genreCreateFormSchema
    ),
    defaultValues: {
      name: ""
    },
  });

  const {
    data: genres,
    error,
    isLoading: isGenresLoading
  } = useGetAllGenre();
  const { data: genre } = useGetOneGenre(uuid || "");

  const { mutate: createGenre } = useCreateGenre(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateGenre } = useUpdateGenre(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteGenre } = useDeleteGenre(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && genre) {
      fillFormInput(form, [
        { property: "name", value: genre.name },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [genre, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteGenre(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyGenre = async (genre: IUpdateGenre) => {
    if (!uuid) return;
    updateGenre({ uuid, data: genre });
  };

  const saveGenre = (genre: ICreateGenre) => {
    createGenre(genre);
  };

  const handleSubmit = async (formData: Partial<ICreateGenre | IUpdateGenre>) => {
    if (uuid) {
      modifyGenre(formData as IUpdateGenre);
    } else {
      setIsModalOpen(true);
      saveGenre(formData as ICreateGenre);
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
        data={genres || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateGenre | IUpdateGenre>
        isEditable={isEditable}
        entityName="Genre"
        fields={genreFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

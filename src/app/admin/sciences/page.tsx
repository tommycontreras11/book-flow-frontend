"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllScience, useGetOneScience } from "@/hooks/api/science.hook";
import {
  useCreateScience,
  useDeleteScience,
  useUpdateScience,
} from "@/mutations/api/sciences";
import { ICreateScience, IUpdateScience } from "@/providers/http/sciences/interface";
import {
  scienceCreateFormSchema,
  scienceUpdateFormSchema,
} from "@/schema/science.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Science() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const scienceFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateScience | IUpdateScience>({
    resolver: zodResolver(
      isEditable ? scienceUpdateFormSchema : scienceCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: sciences, error } = useGetAllScience();
  const { data: science } = useGetOneScience(uuid || "");

  const { mutate: createScience } = useCreateScience(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateScience } = useUpdateScience(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteScience } = useDeleteScience(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && science) {
      fillFormInput(form, [{ property: "name", value: science.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [science, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteScience(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyScience = (science: IUpdateScience) => {
    if (!uuid) return;
    updateScience({ uuid, data: science });
  };

  const saveScience = (science: ICreateScience) => {
    createScience(science);
  };

  const handleSubmit = async (formData: ICreateScience | IUpdateScience) => {
    if (uuid) {
      modifyScience(formData);
    } else {
      saveScience(formData);
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
        data={sciences || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateScience | IUpdateScience>
        isEditable={isEditable}
        entityName="Science"
        fields={scienceFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

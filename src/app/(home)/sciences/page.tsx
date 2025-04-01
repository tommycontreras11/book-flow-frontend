"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllScience, useGetOneScience } from "@/hooks/api/science.hook";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateScience, IUpdateScience } from "@/interfaces/science.interface";
import { createScience, deleteScience, updateScience } from "@/lib/science.lib";
import { fillFormInput } from "@/lib/utils";
import {
  scienceCreateFormSchema,
  scienceUpdateFormSchema,
} from "@/schema/science.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { clearForm } from "@/utils/form";
import { toast } from "@/hooks/use-toast";

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

  const {
    data: sciences,
    isLoading: isLoadingScience,
    error,
    refetch,
  } = useGetAllScience();
  const { data: science } = useGetOneScience(uuid || "");

  useEffect(() => {
    if (isEditable && isModalOpen && science) {
      fillFormInput(form, [{ property: "name", value: science.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [science, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteScience(uuid)
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

  const modifyScience = (science: IUpdateScience) => {
    if (!uuid) return;

    updateScience(uuid, science)
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

  const saveScience = (science: ICreateScience) => {
    createScience(science)
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

  const handleSubmit = async (formData: ICreateScience | IUpdateScience) => {
    if (uuid) {
      modifyScience(formData);
    } else {
      saveScience(formData);
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

"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  UseGetAllBibliographyType,
  UseGetOneBibliographyType,
} from "@/hooks/api/bibliography-type.hook";
import { useToast } from "@/hooks/use-toast";
import {
  ICreateBibliographyType,
  IUpdateBibliographyType
} from "@/interfaces/bibliography-type.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createBibliographyType,
  deleteBibliographyType,
  updateBibliographyType,
} from "@/lib/bibliography-type.lib";
import { fillFormInput } from "@/lib/utils";
import { bibliographyTypeFormSchema } from "@/schema/bibliography-type.schema";
import { clearForm } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function BibliographyType() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");

  const bibliographyTypeFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateBibliographyType | IUpdateBibliographyType>({
    resolver: zodResolver(bibliographyTypeFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    data: bibliographyTypes,
    error,
    isLoading: isLoadingBibliographyType,
    refetch,
  } = UseGetAllBibliographyType();

  const { data: bibliographyType } = UseGetOneBibliographyType(uuid || "");

  useEffect(() => {
    if (!bibliographyType) return;

    if (isModalOpen && isEditable) {
      fillFormInput(form, [{ property: "name", value: bibliographyType.name }]);
      return;
    }

    clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
  }, [bibliographyType, isModalOpen, isEditable, uuid]);

  const handleDelete = (uuid: string) => {
    deleteBibliographyType(uuid)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
        refetch();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000
        });
      });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyBibliographyType = (
    bibliographyType: IUpdateBibliographyType
  ) => {
    if(!uuid) return

    updateBibliographyType(uuid, bibliographyType)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000
        });
      });
  };

  const saveBibliographyType = (bibliographyType: ICreateBibliographyType) => {
    createBibliographyType(bibliographyType)
      .then((data: IMessage) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 3000
        });
        clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 3000
        });
      });
  };

  const handleSubmit = async (
    formData: ICreateBibliographyType | IUpdateBibliographyType
  ) => {
    if (uuid) {
      modifyBibliographyType(formData);
    } else {
      saveBibliographyType(formData);
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
        data={bibliographyTypes || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateBibliographyType | IUpdateBibliographyType>
        isEditable={isEditable}
        entityName="Bibliography Type"
        fields={bibliographyTypeFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

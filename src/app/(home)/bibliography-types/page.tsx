"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  useGetAllBibliographyType,
  useGetOneBibliographyType,
} from "@/hooks/api/bibliography-type.hook";
import {
  ICreateBibliographyType,
  IUpdateBibliographyType,
} from "@/interfaces/bibliography-type.interface";
import { fillFormInput } from "@/lib/utils";
import {
  useCreateBibliographyType,
  useDeleteBibliographyType,
  useUpdateBibliographyType,
} from "@/mutations/api/bibliography-types";
import {
  bibliographyTypeCreateFormSchema,
  bibliographyTypeUpdateFormSchema,
} from "@/schema/bibliography-type.schema";
import { clearForm } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function BibliographyType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");

  const [bibliographyTypeFields, setBibliographyTypeFields] = useState<
    IFormField[]
  >([{ name: "name", label: "Name", type: "text" }]);

  const form = useForm<ICreateBibliographyType | IUpdateBibliographyType>({
    resolver: zodResolver(
      isEditable
        ? bibliographyTypeUpdateFormSchema
        : bibliographyTypeCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const {
    data: bibliographyTypes,
    error,
  } = useGetAllBibliographyType();

  const { data: bibliographyType } = useGetOneBibliographyType(uuid || "");

  const { mutate: createBibliographyType } = useCreateBibliographyType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateBibliographyType } = useUpdateBibliographyType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteBibliographyType } = useDeleteBibliographyType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && bibliographyType) {
      fillFormInput(form, [{ property: "name", value: bibliographyType.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [bibliographyType, isModalOpen, isEditable, uuid]);

  const handleDelete = (uuid: string) => {
    deleteBibliographyType(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyBibliographyType = (
    bibliographyType: IUpdateBibliographyType
  ) => {
    if (!uuid) return;
    updateBibliographyType({ uuid, data: bibliographyType });
  };

  const saveBibliographyType = (bibliographyType: ICreateBibliographyType) => {
    createBibliographyType(bibliographyType);
  };

  const handleSubmit = async (
    formData: ICreateBibliographyType | IUpdateBibliographyType
  ) => {
    if (uuid) {
      modifyBibliographyType(formData);
    } else {
      saveBibliographyType(formData);
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

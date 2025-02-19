"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  IBibliographyType,
  ICreateBibliographyType,
  IUpdateBibliographyType,
} from "@/interfaces/bibliography-type.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createBibliographyType,
  deleteBibliographyType,
  getAllBibliographyType,
  getOneBibliographyType,
  updateBibliographyType,
} from "@/lib/bibliography-type.lib";
import { fillFormInput } from "@/lib/utils";
import { bibliographyTypeFormSchema } from "@/schema/bibliography-type.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function BibliographyType() {
  const [bibliographyTypes, setBibliographyTypes] = useState<
    IBibliographyType[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState("");

  const bibliographyTypeFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateBibliographyType | IUpdateBibliographyType>({
    resolver: zodResolver(bibliographyTypeFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchBibliographyTypes = async () => {
    getAllBibliographyType()
      .then((bibliographyTypes) => {
        setBibliographyTypes(bibliographyTypes.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBibliographyTypes();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteBibliographyType(uuid)
      .then((data: IMessage) => {
        fetchBibliographyTypes();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneBibliographyType(uuid)
      .then((bibliographyType) => {
        fillFormInput(form, [
          { property: "name", value: bibliographyType.data.name },
        ]);
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyBibliographyType = (
    bibliographyType: IUpdateBibliographyType
  ) => {
    updateBibliographyType(uuid, bibliographyType)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveBibliographyType = (bibliographyType: ICreateBibliographyType) => {
    createBibliographyType(bibliographyType)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (
    formData: ICreateBibliographyType | IUpdateBibliographyType
  ) => {
    if (uuid) {
      modifyBibliographyType(formData);
      fetchBibliographyTypes();
      return;
    }

    saveBibliographyType(formData);
    fetchBibliographyTypes();
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
        data={bibliographyTypes}
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

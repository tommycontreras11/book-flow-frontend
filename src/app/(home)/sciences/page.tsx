"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { IMessage } from "@/interfaces/message.interface";
import {
  ICreateScience,
  IScience,
  IUpdateScience,
} from "@/interfaces/science.interface";
import {
  createScience,
  deleteScience,
  getAllScience,
  getOneScience,
  updateScience,
} from "@/lib/science.lib";
import { fillFormInput } from "@/lib/utils";
import { scienceFormSchema } from "@/schema/science.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Science() {
  const [sciences, setSciences] = useState<IScience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState("");
  const scienceFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreateScience | IUpdateScience>({
    resolver: zodResolver(scienceFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchSciences = async () => {
    getAllScience()
      .then((sciences) => {
        setSciences(sciences.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSciences();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteScience(uuid)
      .then((data: IMessage) => {
        fetchSciences();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneScience(uuid)
      .then((science) => {
        fillFormInput(form, [{ property: "name", value: science.data.name }]);
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyScience = (science: IUpdateScience) => {
    updateScience(uuid, science)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveScience = (science: ICreateScience) => {
    createScience(science)
      .then((data: IMessage) => {
        form.reset();

        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateScience | IUpdateScience) => {
    if (uuid) {
      modifyScience(formData);
      fetchSciences();
      return;
    }

    saveScience(formData);
    fetchSciences();
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
        data={sciences}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />
      {isModalOpen && (
        <CreateUpdateForm<ICreateScience | IUpdateScience>
          isEditable={isEditable}
          entityName="Science"
          fields={scienceFields}
          form={form}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

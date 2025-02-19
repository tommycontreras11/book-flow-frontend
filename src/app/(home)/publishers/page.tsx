"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { IMessage } from "@/interfaces/message.interface";
import {
  ICreatePublisher,
  IPublisher,
  IUpdatePublisher,
} from "@/interfaces/publisher.interface";
import {
  createPublisher,
  deletePublisher,
  getAllPublisher,
  getOnePublisher,
  updatePublisher,
} from "@/lib/publisher.lib";
import { fillFormInput } from "@/lib/utils";
import { publisherFormSchema } from "@/schema/publisher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Publisher() {
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState("");
  const publisherFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreatePublisher | IUpdatePublisher>({
    resolver: zodResolver(publisherFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchPublishers = async () => {
    getAllPublisher()
      .then((publishers) => {
        setPublishers(publishers.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleDelete = (uuid: string) => {
    deletePublisher(uuid)
      .then((data: IMessage) => {
        fetchPublishers();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOnePublisher(uuid)
      .then((publisher) => {
        fillFormInput(form, [{ property: "name", value: publisher.data.name }]);
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyPublisher = (publisher: IUpdatePublisher) => {
    updatePublisher(uuid, publisher)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const savePublisher = (publisher: ICreatePublisher) => {
    createPublisher(publisher)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (
    formData: ICreatePublisher | IUpdatePublisher
  ) => {
    if (uuid) {
      modifyPublisher(formData);
      fetchPublishers();
      return;
    }

    savePublisher(formData);
    fetchPublishers();
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
        data={publishers}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreatePublisher | IUpdatePublisher>
        isEditable={isEditable}
        entityName="Publisher"
        fields={publisherFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

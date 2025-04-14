"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  useGetAllPublisher,
  useGetOnePublisher,
} from "@/hooks/api/publisher.hook";
import {
  useCreatePublisher,
  useDeletePublisher,
  useUpdatePublisher,
} from "@/mutations/api/publishers";
import {
  ICreatePublisher,
  IUpdatePublisher,
} from "@/providers/http/publishers/interface";
import {
  publisherCreateFormSchema,
  publisherUpdateFormSchema,
} from "@/schema/publisher.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Publisher() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const publisherFields: IFormField[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  const form = useForm<ICreatePublisher | IUpdatePublisher>({
    resolver: zodResolver(
      isEditable ? publisherUpdateFormSchema : publisherCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: publishers, error } = useGetAllPublisher();
  const { data: publisher } = useGetOnePublisher(uuid || "");

  const { mutate: createPublisher } = useCreatePublisher(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updatePublisher } = useUpdatePublisher(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deletePublisher } = useDeletePublisher(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && publisher) {
      fillFormInput(form, [{ property: "name", value: publisher.name }]);
      return;
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [publisher, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deletePublisher(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyPublisher = (publisher: IUpdatePublisher) => {
    if (!uuid) return;
    updatePublisher({ uuid, data: publisher });
  };

  const savePublisher = (publisher: ICreatePublisher) => {
    createPublisher(publisher);
  };

  const handleSubmit = async (
    formData: ICreatePublisher | IUpdatePublisher
  ) => {
    if (uuid) {
      modifyPublisher(formData);
    } else {
      savePublisher(formData);
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
        data={publishers || []}
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

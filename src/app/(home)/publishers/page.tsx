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
import { IMessage } from "@/interfaces/message.interface";
import {
  ICreatePublisher,
  IUpdatePublisher,
} from "@/interfaces/publisher.interface";
import {
  createPublisher,
  deletePublisher,
  updatePublisher,
} from "@/lib/publisher.lib";
import { fillFormInput } from "@/lib/utils";
import {
  publisherCreateFormSchema,
  publisherUpdateFormSchema,
} from "@/schema/publisher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { clearForm } from "@/utils/form";
import { toast } from "@/hooks/use-toast";

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

  const {
    data: publishers,
    error,
    isLoading: isLoadingPublishers,
    refetch,
  } = useGetAllPublisher();
  const { data: publisher } = useGetOnePublisher(uuid || "");

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
    deletePublisher(uuid)
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

  const modifyPublisher = (publisher: IUpdatePublisher) => {
    if (!uuid) return;

    updatePublisher(uuid, publisher)
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

  const savePublisher = (publisher: ICreatePublisher) => {
    createPublisher(publisher)
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

  const handleSubmit = async (
    formData: ICreatePublisher | IUpdatePublisher
  ) => {
    if (uuid) {
      modifyPublisher(formData);
    } else {
      savePublisher(formData);
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

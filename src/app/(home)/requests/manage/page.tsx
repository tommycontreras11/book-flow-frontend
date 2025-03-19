"use client";

import {
  CreateUpdateForm,
  IFormField
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { requestStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllBook } from "@/hooks/api/book.hook";
import { useGetAllRequest } from "@/hooks/api/request.hook";
import { IMessage } from "@/interfaces/message.interface";
import {
  IUpdateRequest
} from "@/interfaces/request.interface";
import {
  deleteRequest,
  updateRequest
} from "@/lib/request.lib";
import { requestUpdateFormSchema } from "@/schema/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function Manage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<null | string>(null);
  const [requestFields, setRequestFields] = useState<IFormField[]>([]);

  const form = useForm<z.infer<typeof requestUpdateFormSchema>>({
    resolver: zodResolver(requestUpdateFormSchema),
    defaultValues: {
      bookUUID: undefined,
      status: undefined,
    },
  });

  const { data: requests, error, isLoading: isLoadingRequests, refetch } = useGetAllRequest()
  const { data: books, isLoading: isLoadingBooks } = useGetAllBook()

  useEffect(() => {
    if(!isLoadingBooks) return
    
    setRequestFields([
      {
        name: "bookUUID",
        label: "Book",
        type: "select",
        options: books?.map((book) => ({
          label: book.name,
          value: book.uuid,
        })),
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: Object.values(StatusRequestEnum).map((value) => ({
          label:
            value.charAt(0).toUpperCase() +
            value.slice(1).toLocaleLowerCase(),
          value,
        })),
      },
    ]);  
  }, [books, isLoadingBooks]);
  

  const handleDelete = (uuid: string) => {
    deleteRequest(uuid)
      .then((data: IMessage) => {
        refetch();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyRequest = (request: IUpdateRequest) => {
    if (!uuid) return;

    updateRequest(uuid, request)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        setUUID(null);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: IUpdateRequest) => {
    if (uuid) {
      modifyRequest(formData);
      refetch();
      return;
    }
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={requests || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={requestStatusTableDefinitions}
      />

      <CreateUpdateForm<IUpdateRequest>
        isEditable={isEditable}
        entityName="Request"
        fields={requestFields}
        form={form as unknown as UseFormReturn<IUpdateRequest>}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

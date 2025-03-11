"use client";

import {
  CreateUpdateForm,
  IFormField,
  IOptionsFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { requestStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IBook } from "@/interfaces/book.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  IRequest,
  IUpdateRequest
} from "@/interfaces/request.interface";
import { getAllBook } from "@/lib/book.lib";
import {
  deleteRequest,
  getAllRequest,
  getOneRequest,
  updateRequest
} from "@/lib/request.lib";
import { requestUpdateFormSchema } from "@/schema/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function Manage() {
  const [requests, setRequests] = useState<IRequest[]>([]);
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

  const fetchRequests = async () => {
    getAllRequest()
      .then((requests) => {
        setRequests(requests.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  
    let bookOptions: IOptionsFormField[] = [];
  
    getAllBook()
      .then((books) => {
        bookOptions = books.data.map((book: IBook) => ({
          label: book.name,
          value: book.uuid,
        }));
  
        console.log(bookOptions);
  
        setRequestFields([
          {
            name: "bookUUID",
            label: "Book",
            type: "select",
            options: bookOptions,
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
      })
      .catch((err) => console.log(err));
  }, []);
  

  const handleDelete = (uuid: string) => {
    deleteRequest(uuid)
      .then((data: IMessage) => {
        fetchRequests();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneRequest(uuid)
      .then((request) => {
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
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
      fetchRequests();
      return;
    }
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={requests}
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

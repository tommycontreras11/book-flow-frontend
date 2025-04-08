"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { requestStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllBook } from "@/hooks/api/book.hook";
import { useGetAllRequest, useGetOneRequest } from "@/hooks/api/request.hook";
import { IUpdateRequest } from "@/interfaces/request.interface";
import { fillFormInput } from "@/lib/utils";
import { useDeleteRequest, useUpdateRequest } from "@/mutations/api/requests";
import { requestUpdateFormSchema } from "@/schema/request.schema";
import { clearForm } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function Request() {
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

  const {
    data: requests,
    error,
    isLoading: isLoadingRequests,
    refetch,
  } = useGetAllRequest(true);
  const {
    data: request,
    isLoading: isLoadingRequest,
    refetch: refetchRequest,
  } = useGetOneRequest(uuid ?? "");
  const { data: books, isLoading: isLoadingBooks } = useGetAllBook();

  const { mutate: updateRequest } = useUpdateRequest(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteRequest } = useDeleteRequest(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isLoadingBooks) return;

    setRequestFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "bookUUID")) {
        return [
          ...prevFields,
          {
            name: "bookUUID",
            label: "Book",
            type: "select",
            options: books?.map((book) => ({
              label: book.name,
              value: book.uuid,
            })),
          },
        ];
      }
      return prevFields;
    });

    setRequestFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "status")) {
        return [
          ...prevFields,
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
        ];
      }
      return prevFields;
    });
  }, [books, isLoadingBooks]);

  useEffect(() => {
    if (isEditable && isModalOpen && request) {
      fillFormInput(form, [
        { property: "bookUUID", value: request.book.uuid },
        { property: "status", value: request.status },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [request, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteRequest(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyRequest = (request: IUpdateRequest) => {
    if (!uuid) return;
    updateRequest({ uuid, data: request });
  };

  const handleSubmit = async (formData: IUpdateRequest) => {
    if (!uuid) return;
    modifyRequest(formData);
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
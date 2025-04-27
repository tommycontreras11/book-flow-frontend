"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllBook } from "@/hooks/api/book.hook";
import { useGetAllComment, useGetOneComment } from "@/hooks/api/comment.hook";
import { useGetAllUser } from "@/hooks/api/user.hook";
import {
  useDeleteComment,
  useUpdateComment
} from "@/mutations/api/comments";
import { ICreateComment, IUpdateComment } from "@/providers/http/comments/interface";
import {
  commentCreateFormSchema,
  commentUpdateFormSchema,
} from "@/schema/comment.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Comment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [commentFields, setCommentFields] = useState<IFormField[]>([
    { name: "file", label: "File", type: "file" },
  ]);

  const form = useForm<ICreateComment | IUpdateComment>({
    resolver: zodResolver(
      isEditable ? commentUpdateFormSchema : commentCreateFormSchema
    ),
    defaultValues: {
      content: "",
      bookUUID: "",
      userUUID: "",
      parentCommentUUID: "",
      file: undefined,
    },
  });

  const {
    data: comments,
    error: commentError,
    isLoading: isLoadingComment,
  } = useGetAllComment();
  const { data: comment } = useGetOneComment(uuid || "");
  const { data: books, isLoading: isLoadingBook } =
    useGetAllBook();
  const { data: users, isLoading: isLoadingUser } = useGetAllUser();

  const { mutate: updateComment } = useUpdateComment(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteComment } = useDeleteComment(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (
      isLoadingBook ||
      isLoadingUser
    )
      return;

    setCommentFields((prevFields) => {
      const fields = [...prevFields];

      const addFieldIsMissing = (formFields: IFormField[]) => {
        formFields.find((formField) => {
          if (!fields.find((field) => field.name === formField.name)) {
            fields.push(formField);
          }
        });
      };

      addFieldIsMissing([
        {
          name: "bookUUIDs",
          label: "Book",
          type: "select",
          options: books?.map((book) => ({
            label: book.name,
            value: book.uuid,
          })),
        },
        {
          name: "userUUIDs",
          label: "User",
          type: "select",
          options: users?.map((user) => ({
            label: user.name,
            value: user.uuid,
          })),
        },
      ]);

      return fields;
    });
  }, [
    isLoadingBook,
    isLoadingUser,
  ]);

  useEffect(() => {
    if (isEditable && isModalOpen && comment) {
      fillFormInput(form, [
        { property: "content", value: comment.content },
        { property: "bookUUID", value: comment.book.uuid },
        { property: "userUUID", value: comment.user.uuid },
        { property: "parentCommentUUID", value: comment?.parentComment?.uuid },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [comment, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteComment(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyComment = (comment: FormData) => {
    if (!uuid) return;
    updateComment({ uuid, data: comment });
  };


  const handleSubmit = (comment: ICreateComment | IUpdateComment) => {
    const formData = new FormData();

    commentFields
      .forEach((field) => {
        const value =
          comment?.[field.name as keyof ICreateComment | keyof IUpdateComment];
        if (value !== undefined && value !== null) {
          formData.append(field.name, value.toString());
        }
      });

    if (comment?.file) {
      formData.append("file", comment.file);
    }

    if (uuid) {
      modifyComment(formData);
    }
  };

  if (commentError) return <div>Request Failed</div>;
  if (isLoadingComment) return <div>Loading...</div>;

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={comments || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateComment | IUpdateComment>
        isEditable={isEditable}
        entityName="Comment"
        fields={commentFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { PersonTypeEnum } from "@/enums/common.enum";
import { useGetAllUser, useGetOneUser } from "@/hooks/api/user.hook";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateUser, IUpdateUser } from "@/interfaces/user.interface";
import { createUser, deleteUser, updateUser } from "@/lib/user.lib";
import { fillFormInput } from "@/lib/utils";
import { userFormSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<null | string>(null);
  const [userFields, setUserFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "identification", label: "Identification", type: "text" },
    {
      name: "person_type",
      label: "Person Type",
      type: "select",
      options: Object.values(PersonTypeEnum).map((personType) => ({
        label:
          personType.charAt(0).toUpperCase() +
          personType.slice(1).toLocaleLowerCase(),
        value: personType,
      })),
    },
  ]);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      identification: "",
      person_type: undefined,
    },
  });

  const { data: users, error, isLoading, refetch } = useGetAllUser();
  const { data: user } = useGetOneUser(uuid || "");

  useEffect(() => {}, [users, isLoading]);

  useEffect(() => {
    if (!user) return;

    if (isModalOpen && isEditable) {
      console.log(user)
      fillFormInput(form, [
        { property: "name", value: user.name },
        {
          property: "email",
          value: user.email,
        },
        {
          property: "password",
          value: user.password,
        },
        {
          property: "identification",
          value: user.identification,
        },
        {
          property: "person_type",
          value: user.person_type,
        },
      ]);

      return;
    }

    form.reset();
    setIsEditable(false);
  }, [user, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteUser(uuid)
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

  const modifyUser = (user: IUpdateUser) => {
    if (!uuid) return;

    updateUser(uuid, user)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        setUUID(null);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveUser = (user: ICreateUser) => {
    createUser(user)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateUser | IUpdateUser) => {
    if (uuid) {
      modifyUser(formData);
    } else {
      saveUser(formData as ICreateUser);
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
        data={users || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateUser | IUpdateUser>
        isEditable={isEditable}
        entityName="User"
        fields={userFields}
        form={form as unknown as UseFormReturn<ICreateUser | IUpdateUser>}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

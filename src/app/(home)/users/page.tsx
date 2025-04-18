"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { PersonTypeEnum } from "@/enums/common.enum";
import { useGetAllUser, useGetOneUser } from "@/hooks/api/user.hook";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from "@/mutations/api/users";
import { ICreateUser, IUpdateUser } from "@/providers/http/users/interface";
import {
  userCreateFormSchema,
  userUpdateFormSchema,
} from "@/schema/user.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
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

  const form = useForm<ICreateUser | IUpdateUser>({
    resolver: zodResolver(
      isEditable ? userUpdateFormSchema : userCreateFormSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      identification: "",
      person_type: undefined,
    },
  });

  const { data: users, error } = useGetAllUser();
  const { data: user } = useGetOneUser(uuid || "");

  const { mutate: createUser } = useCreateUser(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateUser } = useUpdateUser(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteUser } = useDeleteUser(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!user) return;

    if (isModalOpen && isEditable) {
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

    clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
  }, [user, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteUser(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyUser = (user: IUpdateUser) => {
    if (!uuid) return;
    updateUser({ uuid, data: user });
  };

  const saveUser = (user: ICreateUser) => {
    createUser(user);
  };

  const handleSubmit = async (formData: ICreateUser | IUpdateUser) => {
    if (uuid) {
      modifyUser(formData);
    } else {
      saveUser(formData as ICreateUser);
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

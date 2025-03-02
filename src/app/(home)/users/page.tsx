"use client";

import {
  CreateUpdateForm,
  IFormField
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { PersonTypeEnum } from "@/enums/common.enum";
import { IMessage } from "@/interfaces/message.interface";
import { ICreateUser, IUpdateUser, IUser } from "@/interfaces/user.interface";
import {
  createUser,
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "@/lib/user.lib";
import { fillFormInput } from "@/lib/utils";
import { userFormSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<null | string>(null);
  const [userFields, setUserFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "identification", label: "Identification", type: "text" },
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

  const fetchUsers = async () => {
    getAllUser()
      .then((users) => {
        setUsers(users.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUserFields((prevFields) => [
      ...prevFields,
      {
        name: "person_type",
        label: "Person Type",
        type: "select",
        options: [
          {
            label: "Legal",
            value: PersonTypeEnum.LEGAL,
          },
          {
            label: "Natural",
            value: PersonTypeEnum.NATURAL,
          },
        ],
      },
    ]);

    fetchUsers();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteUser(uuid)
      .then((data: IMessage) => {
        fetchUsers();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneUser(uuid)
      .then((user) => {
        fillFormInput(form, [
          { property: "name", value: user.data.name },
          {
            property: "email",
            value: user.data.email,
          },
          {
            property: "password",
            value: user.data.password,
          },
          {
            property: "identification",
            value: user.data.identification,
          },
          {
            property: "person_type",
            value: user.data.person_type,
          },
        ]);

        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
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
      fetchUsers();
      return;
    }

    saveUser(formData as ICreateUser);
    fetchUsers();
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
        data={users}
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

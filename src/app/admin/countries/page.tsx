"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllCountry, useGetOneCountry } from "@/hooks/api/country.hook";
import {
  useCreateCountry,
  useDeleteCountry,
  useUpdateCountry,
} from "@/mutations/api/countries";
import { ICreateCountry, IUpdateCountry } from "@/providers/http/countries/interface";
import {
  countryCreateFormSchema,
  countryUpdateFormSchema,
} from "@/schema/country.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Country() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [countryFields, setCountryFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateCountry | IUpdateCountry>({
    resolver: zodResolver(
      isEditable ? countryUpdateFormSchema : countryCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: countries, error } = useGetAllCountry();
  const { data: country } = useGetOneCountry(uuid || "");

  const { mutate: createCountry } = useCreateCountry(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateCountry } = useUpdateCountry(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteCountry } = useDeleteCountry(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!country) return;

    if (isEditable && isModalOpen && country) {
      fillFormInput(form, [{ property: "name", value: country.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [country, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteCountry(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyCountry = (country: IUpdateCountry) => {
    if (!uuid) return;
    updateCountry({ uuid, data: country });
  };

  const saveCountry = (country: ICreateCountry) => {
    createCountry(country);
  };

  const handleSubmit = async (formData: ICreateCountry | IUpdateCountry) => {
    if (uuid) {
      modifyCountry(formData);
    } else {
      saveCountry(formData as ICreateCountry);
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
        data={countries || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateCountry | IUpdateCountry>
        isEditable={isEditable}
        entityName="Country"
        fields={countryFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

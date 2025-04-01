"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllCountry, useGetOneCountry } from "@/hooks/api/country.hook";
import {
  ICreateCountry,
  IUpdateCountry
} from "@/interfaces/country.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createCountry,
  deleteCountry,
  updateCountry,
} from "@/lib/country.lib";
import { fillFormInput } from "@/lib/utils";
import { countryCreateFormSchema, countryUpdateFormSchema } from "@/schema/country.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { toast } from "@/hooks/use-toast";
import { clearForm } from "@/utils/form";

export default function Country() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [countryFields, setCountryFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateCountry | IUpdateCountry>({
    resolver: zodResolver(isEditable ? countryUpdateFormSchema : countryCreateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: countries, error, isLoading: isCountriesLoading, refetch } = useGetAllCountry()
  const { data: country } = useGetOneCountry(uuid || "")

  useEffect(() => {
    if(!country) return

    if(isEditable && isModalOpen && country) {
      fillFormInput(form, [{ property: "name", value: country.name }]);
    }

    if(!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [country, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteCountry(uuid)
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

  const modifyCountry = (country: IUpdateCountry) => {
    if(!uuid) return

    updateCountry(uuid, country)
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

  const saveCountry = (country: ICreateCountry) => {
    createCountry(country)
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

  const handleSubmit = async (formData: ICreateCountry | IUpdateCountry) => {
    if (uuid) {
      modifyCountry(formData);
    } else {
      saveCountry(formData as ICreateCountry);
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

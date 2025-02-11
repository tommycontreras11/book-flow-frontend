"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  ICountry,
  ICreateCountry,
  IUpdateCountry,
} from "@/interfaces/country.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createCountry,
  deleteCountry,
  getAllCountries,
  getOneCountry,
  updateCountry,
} from "@/lib/country.lib";
import { fillFormInput } from "@/lib/utils";
import { countryFormSchema } from "@/schema/country.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Country() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState("");
  const [countryFields, setCountryFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateCountry | IUpdateCountry>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchCountries = async () => {
    getAllCountries()
      .then((countries) => {
        setCountries(countries.data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetchCountries();
  }, [])

  const handleDelete = (uuid: string) => {
    deleteCountry(uuid)
      .then((data: IMessage) => {
        fetchCountries();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneCountry(uuid)
      .then((country) => {
        fillFormInput(form, [{ property: "name", value: country.data.name }]);
        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyCountry = (country: IUpdateCountry) => {
    updateCountry(uuid, country)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveCountry = (country: ICreateCountry) => {
    createCountry(country)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateCountry | IUpdateCountry) => {
    if (uuid) {
      modifyCountry(formData);
      fetchCountries();
      return;
    }

    saveCountry(formData as ICreateCountry);
    fetchCountries();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={countries}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      {isModalOpen && (
        <CreateUpdateForm<ICreateCountry | IUpdateCountry>
          isEditable={isEditable}
          entityName="Country"
          fields={countryFields}
          form={form}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

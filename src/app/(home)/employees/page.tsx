"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { WorkShiftEnum } from "@/enums/common.enum";
import {
  ICreateEmployee,
  IEmployee,
  IUpdateEmployee,
} from "@/interfaces/employee.interface";
import { IMessage } from "@/interfaces/message.interface";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getOneEmployee,
  updateEmployee,
} from "@/lib/employee.lib";
import { fillFormInput } from "@/lib/utils";
import { employeeFormSchema } from "@/schema/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { columns } from "./table/column";

export default function Employee() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<null | string>(null);
  const [employeeFields, setEmployeeFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "identification", label: "Identification", type: "text" },
    { name: "commission_percentage", label: "Commission Percentage", type: "number" },
    { name: "entry_date", label: "Entry Date", type: "date" },
  ]);

  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      identification: "",
      work_shift: undefined,
      commission_percentage: 0,
      entry_date: undefined,
    },
  });

  const fetchEmployees = async () => {
    getAllEmployee()
      .then((employees) => {
        console.log(employees);
        setEmployees(employees.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const workShiftOptions = Object.values(WorkShiftEnum).map((value) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase(),
      value,
    }))

    setEmployeeFields((prevFields) => [
      ...prevFields,
      {
        name: "work_shift",
        label: "Work Shift",
        type: "select",
        options: workShiftOptions
      },
    ]);

    fetchEmployees();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteEmployee(uuid)
      .then((data: IMessage) => {
        fetchEmployees();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneEmployee(uuid)
      .then((employee) => {
        fillFormInput(form, [
          { property: "name", value: employee.data.name },
          {
            property: "email",
            value: employee.data.email,
          },
          {
            property: "password",
            value: employee.data.password,
          },
          {
            property: "identification",
            value: employee.data.identification,
          },
          {
            property: "work_shift",
            value: employee.data.work_shift,
          },
          {
            property: "commission_percentage",
            value: employee.data.commission_percentage,
          },
          {
            property: "entry_date",
            value: employee.data.entry_date,
          },
        ]);

        setIsEditable(true);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyEmployee = (employee: IUpdateEmployee) => {
    if (!uuid) return;

    updateEmployee(uuid, employee)
      .then((data: IMessage) => {
        form.reset();
        setIsEditable(false);
        setIsModalOpen(false);
        setUUID(null);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveEmployee = (employee: ICreateEmployee) => {
    createEmployee(employee)
      .then((data: IMessage) => {
        form.reset();
        setIsModalOpen(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateEmployee | IUpdateEmployee) => {
    if (uuid) {
      modifyEmployee(formData);
      fetchEmployees();
      return;
    }

    saveEmployee(formData as ICreateEmployee);
    fetchEmployees();
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
        data={employees}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateEmployee | IUpdateEmployee>
        isEditable={isEditable}
        entityName="Employee"
        fields={employeeFields}
        form={
          form as unknown as UseFormReturn<ICreateEmployee | IUpdateEmployee>
        }
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

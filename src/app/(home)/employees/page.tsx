"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { WorkShiftEnum } from "@/enums/common.enum";
import {
  useGetAllEmployee,
  useGetOneEmployee,
} from "@/hooks/api/employee.hook";
import { fillFormInput } from "@/lib/utils";
import {
  useCreateEmployee,
  useDeleteEmployee,
  useUpdateEmployee,
} from "@/mutations/api/employees";
import {
  ICreateEmployee,
  IUpdateEmployee,
} from "@/providers/http/employees/interface";
import {
  employeeCreateFormSchema,
  employeeUpdateFormSchema,
} from "@/schema/employee.schema";
import { clearForm } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { columns } from "./table/column";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<null | string>(null);
  const workShiftOptions = Object.values(WorkShiftEnum).map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase(),
    value,
  }));
  const [employeeFields, setEmployeeFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "password", label: "Password", type: "text" },
    { name: "identification", label: "Identification", type: "text" },
    {
      name: "commission_percentage",
      label: "Commission Percentage",
      type: "number",
    },
    {
      name: "entry_date",
      label: "Entry Date",
      type: "date",
      blockDatesAfterToday: true,
    },
    {
      name: "work_shift",
      label: "Work Shift",
      type: "select",
      options: workShiftOptions,
    },
  ]);

  const form = useForm<ICreateEmployee | IUpdateEmployee>({
    resolver: zodResolver(
      isEditable ? employeeUpdateFormSchema : employeeCreateFormSchema
    ),
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

  const { data: employees, error, isLoading } = useGetAllEmployee();
  const { data: employee } = useGetOneEmployee(uuid || "");

  const { mutate: createEmployee } = useCreateEmployee(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: updateEmployee } = useUpdateEmployee(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteEmployee } = useDeleteEmployee(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (employee && isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: employee.name },
        { property: "email", value: employee.email },
        { property: "password", value: employee.password },
        { property: "identification", value: employee.identification },
        { property: "work_shift", value: employee.work_shift ?? "" },
        {
          property: "commission_percentage",
          value: employee.commission_percentage,
        },
        { property: "entry_date", value: new Date(`${employee.entry_date}:00:00:00`) },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [employee, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteEmployee(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyEmployee = (employee: IUpdateEmployee) => {
    if (!uuid) return;
    updateEmployee({ uuid, data: employee });
  };

  const saveEmployee = (employee: ICreateEmployee) => {
    createEmployee(employee);
  };

  const handleSubmit = async (formData: ICreateEmployee | IUpdateEmployee) => {
    if (uuid) {
      modifyEmployee(formData);
    } else {
      saveEmployee(formData as ICreateEmployee);
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
        data={employees || []}
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

"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { LoanManagementEnum } from "@/enums/loan-management.enum";
import {
  useGetAllLoanManagement,
  useGetOneLoanManagement,
} from "@/hooks/api/loan-management";
import {
  useDeleteLoanManagement,
  useUpdateLoanManagement,
} from "@/mutations/api/loans-management";
import { IUpdateLoanManagement } from "@/providers/http/loans-management/interface";
import { loanManagementUpdateFormSchema } from "@/schema/loan-management";
import { clearForm } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { fillFormInput } from "@/lib/utils";

export default function LoanManagement() {
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanManagementFields, setLoanManagementFields] = useState<
    IFormField[]
  >([
    { name: "date_return", label: "Date Return", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: Object.values(LoanManagementEnum).map((status) => ({
        label: status,
        value: status,
      })),
    },
    { name: "comment", label: "Comment", type: "text" },
  ]);

  const form = useForm<IUpdateLoanManagement>({
    resolver: zodResolver(loanManagementUpdateFormSchema),
    defaultValues: {
      comment: "",
      status: undefined,
      date_return: undefined,
    },
  });

  const { data: loans } = useGetAllLoanManagement();

  const { data: loan, isLoading: isLoadingLoan } = useGetOneLoanManagement(
    uuid || ""
  );

  const { mutate: updateLoanManagement } = useUpdateLoanManagement(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });
  const { mutate: deleteLoanManagement } = useDeleteLoanManagement(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isEditable && isModalOpen && loan) {
      fillFormInput(form, [
        { property: "comment", value: loan.comment },
        { property: "status", value: loan.status },
        { property: "date_return", value: new Date(`${loan.date_return}`) },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [loan, isModalOpen, isEditable]);

  const handleSubmit = (values: Partial<IUpdateLoanManagement>) => {
    if (!uuid) return;
    modifyBook(values);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyBook = (loanManagement: Partial<IUpdateLoanManagement>) => {
    if (!uuid) return;
    updateLoanManagement({ uuid, data: loanManagement });
  };

  const handleDelete = (uuid: string) => {
    deleteLoanManagement(uuid);
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={loans || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<IUpdateLoanManagement>
        isEditable={isEditable}
        entityName="Loan Management"
        fields={loanManagementFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

"use client";

import BookCard from "@/components/common/card/book";
import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useGetAllBibliographyType } from "@/hooks/api/bibliography-type.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import { useGetAllLoanManagement } from "@/hooks/api/loan-management";
import {
  ILoanManagement,
  ILoanManagementFilter,
} from "@/providers/http/loans-management/interface";
import { loanManagementFilterSchema } from "@/schema/loan-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function MyLoanManagement() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<ILoanManagementFilter>({
    bibliography_type: undefined,
    language: undefined,
    date_loan: undefined,
    date_return: undefined,
  });
  const [loanManagementFilterFields, setLoanManagementFilterFields] = useState<
    IFormField[]
  >([]);

  const form = useForm<ILoanManagementFilter>({
    resolver: zodResolver(loanManagementFilterSchema),
    defaultValues: {
      bibliography_type: undefined,
      language: undefined,
      date_loan: undefined,
      date_return: undefined,
    },
  });

  const { data: loans, isLoading: isLoadingLoan } =
    useGetAllLoanManagement(filters);
  const { data: bibliographyTypes, isLoading: isLoadingBibliographyType } =
    useGetAllBibliographyType();
  const { data: languages, isLoading: isLoadingLanguage } = useGetAllLanguage();

  useEffect(() => {
    if (isLoadingBibliographyType || isLoadingLanguage) return;

    setLoanManagementFilterFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "bibliography_type")) {
        return [
          ...prevFields,
          {
            name: "bibliography_type",
            label: "Bibliography Type",
            type: "select",
            options: bibliographyTypes?.map((bibliographyType) => ({
              value: bibliographyType.name,
              label: bibliographyType.name,
            })),
          },
        ];
      }

      return prevFields;
    });

    setLoanManagementFilterFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "language")) {
        return [
          ...prevFields,
          {
            name: "language",
            label: "Language",
            type: "select",
            options: languages?.map((language) => ({
              value: language.name,
              label: language.name,
            })),
          },
        ];
      }

      return prevFields;
    });

    setLoanManagementFilterFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "date_loan")) {
        return [
          ...prevFields,
          {
            name: "date_loan",
            label: "Date Loan",
            type: "date",
          },
        ];
      }

      return prevFields;
    });

    setLoanManagementFilterFields((prevFields) => {
      if (!prevFields.find((field) => field.name === "date_return")) {
        return [
          ...prevFields,
          {
            name: "date_return",
            label: "Date Return",
            type: "date",
          },
        ];
      }

      return prevFields;
    });
  }, [isLoadingBibliographyType, isLoadingLanguage]);

  const handleSubmit = (data: ILoanManagementFilter) => {
    setFilters({
      bibliography_type: data.bibliography_type,
      language: data.language,
      date_loan: data.date_loan,
      date_return: data.date_return,
    });

    form.reset();
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-end w-full max-w-6xl mx-auto px-4">
      <div className="mb-1">
        <Button
          className="hover:bg-sky-800 bg-sky-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <SlidersHorizontal className="mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {!isLoadingLoan &&
          loans?.map((loan: ILoanManagement) => (
            <div key={loan.uuid} className="w-full">
              <BookCard book={loan.request.book} request={loan.request} user={user || undefined} />
            </div>
          ))}
      </div>

      <CreateUpdateForm<ILoanManagementFilter>
        isEditable={false}
        entityName="Filters"
        fields={loanManagementFilterFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

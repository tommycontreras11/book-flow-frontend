"use client";

import BookCard from "@/components/common/card/book";
import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllRequest } from "@/hooks/api/request.hook";
import { useCreateLoanManagement } from "@/mutations/api/loans-management";
import { useUpdateRequestEmployeeStatus } from "@/mutations/api/requests";
import { ICreateLoanManagement } from "@/providers/http/loans-management/interface";
import { loanManagementCreateFormSchema } from "@/schema/loan-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function MyRequest() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestUUID, setRequestUUID] = useState<string | null>("");
  const [loanManagementFields, setLoanManagementFields] = useState<
    IFormField[]
  >([
    { name: "comment", label: "Comment", type: "text" },
    { name: "date_return", label: "Date Return", type: "date" },
  ]);

  const form = useForm<ICreateLoanManagement>({
    resolver: zodResolver(loanManagementCreateFormSchema),
    defaultValues: {
      comment: "",
      date_return: undefined,
    },
  });

  const isEmployee = useMemo(
    () => user?.role === UserRoleEnum.EMPLOYEE,
    [user]
  );

  const { data: requests, error } = useGetAllRequest(
    !!user,
    isEmployee
      ? [StatusRequestEnum.PENDING]
      : [
          StatusRequestEnum.PENDING,
          StatusRequestEnum.APPROVAL,
          StatusRequestEnum.BORROWED,
        ]
  );

  const { mutate: updateRequestEmployeeStatus } =
    useUpdateRequestEmployeeStatus();

  const isRequestPending = useMemo(() => {
    return requests?.some(
      (request) => request.status === StatusRequestEnum.PENDING
    );
  }, [requests]);

  const isRequestApprove = useMemo(() => {
    return requests?.some(
      (request) => request.status === StatusRequestEnum.APPROVAL
    );
  }, [requests]);

  const isRequestBorrow = useMemo(() => {
    return requests?.some(
      (request) => request.status === StatusRequestEnum.BORROWED
    );
  }, [requests]);

  const modifyRequestEmployeeStatus = (
    uuid: string,
    status: StatusRequestEnum
  ) => {
    if (!isEmployee) return;

    updateRequestEmployeeStatus({
      uuid,
      data: {
        employeeUUID: user!.uuid,
        status,
      },
    });
  };

  const { mutate: createLoanManagement } = useCreateLoanManagement();

  const saveLoanManagement = (
    loanManagement: Partial<ICreateLoanManagement>
  ) => {
    createLoanManagement(loanManagement);
    form.reset();
    setIsModalOpen(false);
  };

  const handleLoanManagement = (
    requestUUID: string,
    status: StatusRequestEnum
  ) => {
    setRequestUUID(requestUUID);
    status === StatusRequestEnum.BORROWED && handleSubmit({ requestUUID });
    status === StatusRequestEnum.APPROVAL && setIsModalOpen(true);
  };

  const handleSubmit = async (formData: Partial<ICreateLoanManagement>) => {
    console.log(requestUUID)
    if (!requestUUID) return;
    saveLoanManagement({ ...formData, requestUUID });
  };

  return (
    <>
      {user ? (
        <div className="mx-auto w-full">
          {isEmployee ? (
            <h2 className="text-2xl text-center font-medium mb-6">
              {isRequestPending
                ? "Requests Awaiting Your Approval"
                : "No pending requests"}
            </h2>
          ) : (
            <h2 className="text-2xl text-center font-medium mb-6">
              {isRequestPending
                ? "Awaiting approval from the employee"
                : isRequestApprove
                ? "Pending Borrow Requests"
                : isRequestBorrow
                ? "Pending Return Requests"
                : "No pending requests"}
            </h2>
          )}

          {requests && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {requests.map((request) => (
                <BookCard
                  key={request.uuid}
                  request={request}
                  book={request.book}
                  user={user || undefined}
                  isRequestToAcceptOrDeny={user?.role === UserRoleEnum.EMPLOYEE}
                  handleSubmit={() => {
                    if (!isRequestBorrow && !isRequestApprove) {
                      modifyRequestEmployeeStatus(
                        request.uuid,
                        StatusRequestEnum.APPROVAL
                      );
                    } else {
                      handleLoanManagement(request.uuid, request.status);
                    }
                  }}
                  handleDenySubmit={() =>
                    modifyRequestEmployeeStatus(
                      request.uuid,
                      StatusRequestEnum.DENIED
                    )
                  }
                />
              ))}
              {isRequestApprove && (
                <CreateUpdateForm<ICreateLoanManagement>
                  isEditable={false}
                  entityName="Loan Management"
                  fields={loanManagementFields}
                  form={form}
                  onSubmit={handleSubmit}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

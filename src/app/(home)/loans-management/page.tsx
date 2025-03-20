"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllRequest } from "@/hooks/api/request.hook";
import { ICreateLoanManagement } from "@/interfaces/loan-management.interface";
import { IMessage } from "@/interfaces/message.interface";
import { createLoanManagement } from "@/lib/loan-management.lib";
import { loanManagementFormSchema } from "@/schema/loan-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function loanManagement() {
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestUUID, setRequestUUID] = useState<string | null>(null);
  const [loanManagementFields, setLoanManagementFields] = useState<
    IFormField[]
  >([
    { name: "comment", label: "Comment", type: "text" },
    { name: "date_return", label: "Date Return", type: "date" },
  ]);

  const form = useForm<ICreateLoanManagement>({
    resolver: zodResolver(loanManagementFormSchema),
    defaultValues: {
      comment: "",
      date_return: undefined,
    },
  });

  const { user } = useAuth();

  const {
    data: requests,
    isLoading,
    error,
    refetch,
  } = useGetAllRequest(
    isUser
      ? [StatusRequestEnum.APPROVAL, StatusRequestEnum.BORROWED]
      : undefined
  );

  useEffect(() => {
    if (!user) return;

    setIsUser(user?.role === UserRoleEnum.USER);
  }, [requests, isLoading, user, isUser]);

  const saveLoanManagement = (loanManagement: ICreateLoanManagement) => {
    createLoanManagement(loanManagement)
      .then((data: IMessage) => {
        setIsModalOpen(false);
        form.reset();
        console.log(data.message);
      })
      .catch((err) => console.log(err.message));
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
    if (!requestUUID) return;
    saveLoanManagement({ ...formData, requestUUID } as ICreateLoanManagement);
    refetch();
  };
  return (
    <div className="mx-auto w-full overflow-x-auto">
      {!requests ||
        (!requests?.find(
          (request) => request.status === StatusRequestEnum.APPROVAL
        ) && <h3 className="text-center font-medium">No approval requests</h3>)}
      {requests &&
        requests.map((request) => (
          <Card className="w-[350px]" key={request.uuid}>
            <CardHeader>
              <CardTitle>{request.book.name}</CardTitle>
            </CardHeader>
            <CardContent>{request.status}</CardContent>
            {user?.role === UserRoleEnum.USER &&
              (request.status === StatusRequestEnum.APPROVAL ||
                request.status === StatusRequestEnum.BORROWED) && (
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() =>
                      handleLoanManagement(request.uuid, request.status)
                    }
                  >
                    {request.status === StatusRequestEnum.APPROVAL
                      ? "Borrow"
                      : "Return"}
                  </Button>
                </CardFooter>
              )}
          </Card>
        ))}

      <CreateUpdateForm<ICreateLoanManagement>
        isEditable={false}
        entityName="Language"
        fields={loanManagementFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

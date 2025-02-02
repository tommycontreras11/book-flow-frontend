"use client";

import { CreateUpdateForm, IFormField } from "@/components/common/create";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRoleEnum } from "@/enums/common.enum";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IMeUser } from "@/interfaces/auth.interface";
import { ICreateLoanManagement } from "@/interfaces/loan-management.interface";
import { IMessage } from "@/interfaces/message.interface";
import { IRequest } from "@/interfaces/request.interface";
import { me } from "@/lib/auth.lib";
import { createLoanManagement } from "@/lib/loan-management.lib";
import { getAllRequest } from "@/lib/request.lib";
import { useEffect, useState } from "react";

export default function loanManagement() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [user, setUser] = useState<IMeUser>();
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanManagementFields, setLoanManagementFields] = useState<
    IFormField[]
  >([
    { name: "date_loan", label: "Date Loan", type: "text" },
    { name: "date_return", label: "Date Return", type: "text" },
    { name: "comment", label: "Comment", type: "text" },
  ]);
  const [uuid, setUUID] = useState("");

  const fetchRequests = async (isUser: boolean | null) => {
    getAllRequest(isUser ? StatusRequestEnum.APPROVAL : undefined)
      .then((request) => setRequests(request.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await me();
        const fetchedUser = userResponse.data;
        setUser(fetchedUser);
        const userStatus = fetchedUser?.role === UserRoleEnum.USER;
        setIsUser(userStatus);
        fetchRequests(userStatus);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const saveLoanManagement = (loanManagement: ICreateLoanManagement) => {
    createLoanManagement(loanManagement, uuid)
      .then((data: IMessage) => {
        setIsModalOpen(false);
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleLoanManagement = (requestUUID: string) => {
    setUUID(requestUUID);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: ICreateLoanManagement) => {
    saveLoanManagement(formData as ICreateLoanManagement);
    fetchRequests(isUser);
  };
  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      {user?.role}
      {!requests ||
        (!requests?.find(
          (request) => request.status === StatusRequestEnum.APPROVAL
        ) && <h1>No approval requests</h1>)}
      {requests &&
        requests.map((request) => (
          <Card className="w-[350px]" key={request.uuid}>
            <CardHeader>
              <CardTitle>{request.book.description}</CardTitle>
            </CardHeader>
            <CardContent>{request.status}</CardContent>
            {isUser && request.status === StatusRequestEnum.APPROVAL && (
              <CardFooter className="flex justify-between">
                <Button onClick={() => handleLoanManagement(request.uuid)}>
                  Borrow
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}

      {isModalOpen && (
        <CreateUpdateForm<ICreateLoanManagement>
          entityName="Author"
          isEditable={false}
          fields={loanManagementFields}
          existingData={{}}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

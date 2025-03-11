"use client";

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
import { IMessage } from "@/interfaces/message.interface";
import { IRequest } from "@/interfaces/request.interface";
import { getAllRequest, updateRequestEmployeeStatus } from "@/lib/request.lib";
import { useEffect, useState } from "react";

export default function Request() {
  const [isEmployee, setIsEmployee] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const { user } = useAuth();

  const fetchRequests = async (isUserEmployee: boolean | null) => {
    if (!user) return;

    getAllRequest(
      isUserEmployee
        ? [StatusRequestEnum.PENDING]
        : [
            StatusRequestEnum.PENDING,
            StatusRequestEnum.APPROVAL,
            StatusRequestEnum.BORROWED,
          ]
    )
      .then((request) => {
        setRequests(request.data);
        console.log(request.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsEmployee(user?.role === UserRoleEnum.EMPLOYEE);
    fetchRequests(isEmployee);
  }, []);

  const modifyRequestEmployeeStatus = (
    uuid: string,
    status: StatusRequestEnum
  ) => {
    if (user?.role !== UserRoleEnum.EMPLOYEE) return;

    updateRequestEmployeeStatus({
      requestUUID: uuid,
      employeeUUID: user.uuid,
      status,
    })
      .then((data: IMessage) => {
        console.log(data.message);
        fetchRequests(isEmployee);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user ? (
        <div className="mx-auto w-full overflow-x-auto">
          {user.role === UserRoleEnum.EMPLOYEE &&
          requests.some(
            (request) => request.status === StatusRequestEnum.PENDING
          ) ? (
            <h2 className="text-2xl text-center font-medium">
              Pending Requests
            </h2>
          ) : (
            <h2 className="text-2xl text-center font-medium">
              Please request a book to be borrowed
            </h2>
          )}
          {requests &&
            requests.map((request) => (
              <Card className="w-[350px]" key={request.uuid}>
                <CardHeader>
                  <CardTitle>{request.book.name}</CardTitle>
                </CardHeader>
                <CardContent>{request.status}</CardContent>
                {isEmployee && request.status === StatusRequestEnum.PENDING && (
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() =>
                        modifyRequestEmployeeStatus(
                          request.uuid,
                          StatusRequestEnum.DENIED
                        )
                      }
                    >
                      Deny
                    </Button>
                    <Button
                      onClick={() =>
                        modifyRequestEmployeeStatus(
                          request.uuid,
                          StatusRequestEnum.APPROVAL
                        )
                      }
                    >
                      Approve
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
        </div>
      ) : null}
    </>
  );
}

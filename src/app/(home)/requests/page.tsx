"use client";

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
import { IMessage } from "@/interfaces/message.interface";
import { IRequest } from "@/interfaces/request.interface";
import { me } from "@/lib/auth.lib";
import { getAllRequest, updateRequestEmployeeStatus } from "@/lib/request.lib";
import { useEffect, useState } from "react";

export default function Request() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [user, setUser] = useState<IMeUser>();
  const [isEmployee, setIsEmployee] = useState<boolean | null>(null);

  const fetchRequests = async (isUserEmployee: boolean | null) => {
    getAllRequest(isUserEmployee ? [StatusRequestEnum.PENDING] : undefined)
      .then((request) => setRequests(request.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await me();
        const fetchedUser = userResponse.data;
        setUser(fetchedUser);
        const employeeStatus = fetchedUser?.role === UserRoleEnum.EMPLOYEE;
        setIsEmployee(employeeStatus);
        fetchRequests(employeeStatus);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const modifyRequestEmployeeStatus = (
    uuid: string,
    status: StatusRequestEnum
  ) => {
    if (!user || user?.role !== UserRoleEnum.EMPLOYEE) return;

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
    <div className="mx-auto w-full  overflow-x-auto">
      {user?.role}
      {!requests || !requests?.find((request) => request.status === StatusRequestEnum.PENDING) && <h1>No pending requests</h1>}
      {requests &&
        requests.map((request) => (
          <Card className="w-[350px]" key={request.uuid}>
            <CardHeader>
              <CardTitle>{request.book.description}</CardTitle>
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
  );
}

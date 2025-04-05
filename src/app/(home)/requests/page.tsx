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
import { useGetAllRequest } from "@/hooks/api/request.hook";
import { useUpdateRequestEmployeeStatus } from "@/mutations/api/requests";
import { useMemo } from "react";

export default function Request() {
  const { user } = useAuth();

  const isEmployee = useMemo(
    () => user?.role === UserRoleEnum.EMPLOYEE,
    [user]
  );

  const {
    data: requests,
    error,
  } = useGetAllRequest(
    isEmployee,
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

  const isRequestPending = requests?.some(
    (request) => request.status === StatusRequestEnum.PENDING
  );

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

  return (
    <>
      {user ? (
        <div className="mx-auto w-full overflow-x-auto">
          {isEmployee && isRequestPending ? (
            <h2 className="text-2xl text-center font-medium">
              Pending Requests
            </h2>
          ) : (
            <h2 className="text-2xl text-center font-medium">
              No Pending Requests to approve
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

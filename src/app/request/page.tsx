"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { StatusRequestEnum } from "@/enums/request.enum";
import { IMessage } from "@/interfaces/message.interface";
import {
  IRequest
} from "@/interfaces/request.interface";
import {
  getAllRequest,
  updateRequestEmployeeStatus
} from "@/lib/request.lib";
import { useEffect, useState } from "react";

export default function Request() {
  const [requests, setRequests] = useState<IRequest[]>([]);

  const fetchRequests = async () => {
    getAllRequest(StatusRequestEnum.PENDING)
      .then((requests) => {
        setRequests(requests.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const modifyRequestEmployeeStatus = (uuid: string, status: StatusRequestEnum) => {
    updateRequestEmployeeStatus({ requestUUID: uuid, employeeUUID: "ecb1cb2e-0453-4d86-aa24-9ad38dc8219e", status })
    .then((data: IMessage) => {
      console.log(data.message);
      fetchRequests();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      {requests.map((request) => (
        <Card className="w-[350px]" key={request.uuid}>
          <CardHeader>
            <CardTitle>{request.book.description}</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => modifyRequestEmployeeStatus(request.uuid,StatusRequestEnum.DENIED)}>Deny</Button>
            <Button onClick={() => modifyRequestEmployeeStatus(request.uuid, StatusRequestEnum.APPROVAL)}>Approve</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

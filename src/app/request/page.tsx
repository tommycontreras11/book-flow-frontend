"use client";

import {
  ICreateRequest,
  IRequest,
  IUpdateRequest,
} from "@/interfaces/request.interface";
import {
  deleteRequest,
  getAllRequest,
  getOneRequest,
  updateRequest,
  createRequest,
} from "@/lib/request.lib";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { IMessage } from "@/interfaces/message.interface";
import { CreateUpdateForm, IFormField } from "@/components/common/create";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Request() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedRequest, setRequest] = useState<IUpdateRequest | null>(null);
  const [uuid, setUUID] = useState("");

  const fetchRequests = async () => {
    getAllRequest()
      .then((requests) => {
        setRequests(requests.data);
        setRequest(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const saveRequest = (request: ICreateRequest) => {
    createRequest(request)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateRequest) => {
    saveRequest(formData);
    fetchRequests();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      {requests.map((request) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{request.book.description}</CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

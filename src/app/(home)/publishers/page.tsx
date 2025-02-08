"use client";

import {
  ICreatePublisher,
  IPublisher,
  IUpdatePublisher,
} from "@/interfaces/publisher.interface";
import {
  deletePublisher,
  getAllPublisher,
  getOnePublisher,
  updatePublisher,
  createPublisher,
} from "@/lib/publisher.lib";
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
import { CreateUpdateForm, IFormField } from "@/components/common/create-update";

export default function Publisher() {
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [selectedPublisher, setPublisher] =
    useState<IUpdatePublisher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");

  const publisherFields: IFormField[] = [
    { name: "description", label: "Description", type: "text" },
  ];

  const fetchPublishers = async () => {
    getAllPublisher()
      .then((publishers) => {
        setPublishers(publishers.data);
        setIsModalOpen(false);
        setPublisher(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const handleDelete = (uuid: string) => {
    deletePublisher(uuid)
      .then((data: IMessage) => {
        fetchPublishers();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOnePublisher(uuid)
      .then((publisher) => {
        setPublisher(publisher.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyPublisher = (publisher: IUpdatePublisher) => {
    updatePublisher(uuid, publisher)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const savePublisher = (publisher: ICreatePublisher) => {
    createPublisher(publisher)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreatePublisher | IUpdatePublisher) => {
    if (uuid) {
      modifyPublisher(formData);
      fetchPublishers();
      return;
    }

    savePublisher(formData);
    fetchPublishers();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button onClick={() => setIsModalOpen(true)}>Create Publisher</button>
      <Table>
        <TableCaption>Publishers List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher.uuid}>
              <TableCell>{publisher.uuid}</TableCell>
              <TableCell>{publisher.description}</TableCell>
              <TableCell>{publisher.status}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleUpdate(publisher.uuid)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(publisher.uuid)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <CreateUpdateForm<ICreatePublisher | IUpdatePublisher>
          isEditable={!!selectedPublisher}
          entityName="Publisher"
          fields={publisherFields}
          existingData={selectedPublisher || {}}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

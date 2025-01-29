"use client";

import {
  ICreateScience,
  IScience,
  IUpdateScience,
} from "@/interfaces/science.interface";
import {
  deleteScience,
  getAllScience,
  getOneScience,
  updateScience,
  createScience,
} from "@/lib/science.lib";
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

export default function Science() {
  const [sciences, setSciences] = useState<IScience[]>([]);
  const [selectedScience, setScience] =
    useState<IUpdateScience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");

  const scienceFields: IFormField[] = [
    { name: "description", label: "Description", type: "text" },
  ];

  const fetchSciences = async () => {
    getAllScience()
      .then((sciences) => {
        setSciences(sciences.data);
        setIsModalOpen(false);
        setScience(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSciences();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteScience(uuid)
      .then((data: IMessage) => {
        fetchSciences();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneScience(uuid)
      .then((science) => {
        setScience(science.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyScience = (science: IUpdateScience) => {
    updateScience(uuid, science)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveScience = (science: ICreateScience) => {
    createScience(science)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateScience | IUpdateScience) => {
    if (uuid) {
      modifyScience(formData);
      fetchSciences();
      return;
    }

    saveScience(formData);
    fetchSciences();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button onClick={() => setIsModalOpen(true)}>Create Science</button>
      <Table>
        <TableCaption>Sciences List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sciences.map((science) => (
            <TableRow key={science.uuid}>
              <TableCell>{science.uuid}</TableCell>
              <TableCell>{science.description}</TableCell>
              <TableCell>{science.status}</TableCell>

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
                      onClick={() => handleUpdate(science.uuid)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(science.uuid)}
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
        <CreateUpdateForm<ICreateScience | IUpdateScience>
          isEditable={!!selectedScience}
          entityName="Science"
          fields={scienceFields}
          existingData={selectedScience || {}}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

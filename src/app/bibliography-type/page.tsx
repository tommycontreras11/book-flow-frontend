"use client";

import {
  ICreateBibliographyType,
  IBibliographyType,
  IUpdateBibliographyType,
} from "@/interfaces/bibliography-type.interface";
import {
  deleteBibliographyType,
  getAllBibliographyType,
  getOneBibliographyType,
  updateBibliographyType,
  createBibliographyType,
} from "@/lib/bibliography-type.lib";
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

export default function BibliographyType() {
  const [bibliographyTypes, setBibliographyTypes] = useState<IBibliographyType[]>([]);
  const [selectedBibliographyType, setBibliographyType] =
    useState<IUpdateBibliographyType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uuid, setUUID] = useState("");

  const bibliographyTypeFields: IFormField[] = [
    { name: "description", label: "Description", type: "text" },
  ];

  const fetchBibliographyTypes = async () => {
    getAllBibliographyType()
      .then((bibliographyTypes) => {
        setBibliographyTypes(bibliographyTypes.data);
        setIsModalOpen(false);
        setBibliographyType(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBibliographyTypes();
  }, []);

  const handleDelete = (uuid: string) => {
    deleteBibliographyType(uuid)
      .then((data: IMessage) => {
        fetchBibliographyTypes();
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (uuid: string) => {
    getOneBibliographyType(uuid)
      .then((bibliographyType) => {
        setBibliographyType(bibliographyType.data);
        setIsModalOpen(true);
        setUUID(uuid);
      })
      .catch((err) => console.log(err));
  };

  const modifyBibliographyType = (bibliographyType: IUpdateBibliographyType) => {
    updateBibliographyType(uuid, bibliographyType)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const saveBibliographyType = (bibliographyType: ICreateBibliographyType) => {
    createBibliographyType(bibliographyType)
      .then((data: IMessage) => {
        console.log(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (formData: ICreateBibliographyType | IUpdateBibliographyType) => {
    if (uuid) {
      modifyBibliographyType(formData);
      fetchBibliographyTypes();
      return;
    }

    saveBibliographyType(formData);
    fetchBibliographyTypes();
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <button onClick={() => setIsModalOpen(true)}>Create Bibliography Type</button>
      <Table>
        <TableCaption>BibliographyTypes List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bibliographyTypes.map((bibliographyType) => (
            <TableRow key={bibliographyType.uuid}>
              <TableCell>{bibliographyType.uuid}</TableCell>
              <TableCell>{bibliographyType.description}</TableCell>
              <TableCell>{bibliographyType.status}</TableCell>

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
                      onClick={() => handleUpdate(bibliographyType.uuid)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(bibliographyType.uuid)}
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
        <CreateUpdateForm<ICreateBibliographyType | IUpdateBibliographyType>
          isEditable={!!selectedBibliographyType}
          entityName="BibliographyType"
          fields={bibliographyTypeFields}
          existingData={selectedBibliographyType || {}}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

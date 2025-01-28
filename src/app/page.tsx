"use client";

import { ILanguage } from "@/interfaces/language.interface";
import { getAllLanguage } from "@/lib/language.lib";
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

export default function Home() {
  let [languages, setLanguages] = useState<ILanguage[]>([]);

  useEffect(() => {
    getAllLanguage()
      .then((languages) => {
        setLanguages(languages.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-auto">
      <Table>
        <TableCaption>Languages List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((language) => (
            <TableRow key={language.uuid}>
              <TableCell>{language.uuid}</TableCell>
              <TableCell>{language.description}</TableCell>
              <TableCell>{language.status}</TableCell>
              
              {/* <TableCell>
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
                      onClick={() => handleUpdate(language.uuid)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(language.uuid)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

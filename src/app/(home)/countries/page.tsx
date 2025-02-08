"use client";

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
  ICountry
} from "@/interfaces/country.interface";
import {
  getAllCountries
} from "@/lib/country.lib";
import { useEffect, useState } from "react";

export default function Country() {
  const [countries, setCountries] = useState<ICountry[]>([]);

  const fetchCountries = async () => {
    getAllCountries()
      .then((countries) => {
        setCountries(countries.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <Table>
        <TableCaption>Countries List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.map((country) => (
            <TableRow key={country.uuid}>
              <TableCell>{country.uuid}</TableCell>
              <TableCell>{country.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

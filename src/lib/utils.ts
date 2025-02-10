import { IForm } from "@/interfaces/common.interface";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fillFormInput = <T extends FieldValues>(
  form: UseFormReturn<T>,
  fields: IForm<T>[]
) => {
  fields.forEach(({ property, value }) => {
    form.setValue(property, value);
  });
};
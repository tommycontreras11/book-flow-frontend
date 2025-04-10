import { IForm } from "@/interfaces/common.interface";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export const clearForm = <T extends FieldValues>(
  form: UseFormReturn<T>,
  closeModal = false,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  setIsEditable: Dispatch<SetStateAction<boolean>>,
  setUUID: Dispatch<SetStateAction<string | null>>
) => {
  form.reset();
  closeModal && setIsModalOpen(false);
  setIsEditable(false);
  setUUID(null);
};

export const fillFormInput = <T extends FieldValues>(
  form: UseFormReturn<T>,
  fields: IForm<T>[]
) => {
  fields.forEach(({ property, value }) => {
    form.setValue(property, value);
  });
};
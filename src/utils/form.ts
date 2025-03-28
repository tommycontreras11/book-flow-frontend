import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export const clearForm = <T extends FieldValues>(form: UseFormReturn<T>, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setIsEditable: Dispatch<SetStateAction<boolean>>, setUUID: Dispatch<SetStateAction<string | null>>) => {
    form.reset();
    setIsModalOpen(false);
    setIsEditable(false);
    setUUID(null);
  }
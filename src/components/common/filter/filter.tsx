import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FieldValues } from "react-hook-form";
import {
  CreateUpdateForm,
  CreateUpdateFormProps,
} from "../modal/create-update";
import { Dispatch, SetStateAction } from "react";

export function Filter<T extends FieldValues>({
  entityName,
  fields,
  form,
  isEditable,
  isOpen,
  onClose,
  onSubmit,
  setIsModalOpen,
}: CreateUpdateFormProps<T> & {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Button
        className="hover:bg-sky-800 bg-sky-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        <SlidersHorizontal className="mr-2" />
        Filter
      </Button>

      <CreateUpdateForm<T>
        isEditable={isEditable}
        entityName={entityName}
        fields={fields}
        form={form}
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
    </>
  );
}

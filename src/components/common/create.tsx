import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface IFormField {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  defaultValue?: string | number;
}

interface CreateUpdateFormProps<T> {
  isEditable: boolean;
  entityName: string;
  fields: IFormField[];
  existingData?: Partial<T>;
  onSubmit: (data: Partial<T>) => void;
}

export function CreateUpdateForm<T>({
  isEditable,
  entityName,
  fields,
  existingData = {},
  onSubmit,
}: CreateUpdateFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(existingData);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{isEditable ? `Update ${entityName}` : `Create ${entityName}`}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditable ? `Update ${entityName}` : `Create ${entityName}`}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type || "text"}
                value={formData[field.name as keyof T] as string | number | readonly string[] | undefined || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

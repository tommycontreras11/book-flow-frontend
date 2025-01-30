import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { MultiSelect } from "../ui/multi-select";

export interface IFormField {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "select" | "multi-select";
  defaultValue?: string | number;
  options?: IOptionsFormField[];
}

export interface IOptionsFormField {
  label: string;
  value: string;
}

interface CreateUpdateFormProps<T> {
  isEditable: boolean;
  entityName: string;
  fields: IFormField[];
  existingData?: Partial<T>;
  onSubmit: (data: Partial<T>) => void;
  onChange?: (name: keyof T, value: string) => void;
}

export function CreateUpdateForm<T>({
  isEditable,
  entityName,
  fields,
  existingData = {},
  onSubmit,
  onChange,
}: CreateUpdateFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(existingData);

  const handleChange = (field: string, value: string | string[] | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (onChange) {
      onChange(field as keyof T, value.toString());
    }
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={true}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditable ? `Update ${entityName}` : `Create ${entityName}`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              {field.type !== "select" && (
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  value={
                    (formData[field.name as keyof T] as
                      | string
                      | number
                      | readonly string[]
                      | undefined) || ""
                  }
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="col-span-3"
                />
              )}
              {field.type === "select" && field.options && (
                <Select
                  onValueChange={(value) => handleChange(field.name, value)}
                >
                  <SelectTrigger className="col-span-3">
                    {field.options.filter(
                      (x) => x.value === formData[field.name as keyof T]
                    )[0]?.label ||
                      "" ||
                      "Select an option"}
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === "multi-select" && field.options && (
                <MultiSelect
                options={field.options}
                  onValueChange={(value) => handleChange(field.name, value)}
                  defaultValue={(formData[field.name as keyof T] as string[]) || []}
                  placeholder="Select options"
                />
                
              )}
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

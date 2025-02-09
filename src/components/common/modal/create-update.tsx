import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Path, UseFormReturn } from "react-hook-form";

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

import { FieldValues } from "react-hook-form";
import { MultiSelect } from "../../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface CreateUpdateFormProps<T extends FieldValues> {
  isEditable: boolean;
  entityName: string;
  fields: IFormField[];
  form: UseFormReturn<T>;
  onSubmit: (data: Partial<T>) => void;
}

export function CreateUpdateForm<T extends FieldValues>({
  isEditable,
  entityName,
  fields,
  form,
  onSubmit,
}: CreateUpdateFormProps<T>) {
  return (
    <Dialog open={true}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {isEditable ? `Update ${entityName}` : `Create ${entityName}`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {fields.map((fieldInput) => (
                <FormField
                  key={fieldInput.name}
                  control={form.control}
                  name={fieldInput.name as Path<T>}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={fieldState?.error?.message && "text-red-500"}
                      >
                        {fieldInput.label}
                      </FormLabel>
                      {fieldInput.type === "text" && (
                        <FormControl>
                          <Input
                            placeholder={"Type your " + field.name}
                            {...field}
                          />
                        </FormControl>
                      )}

                      {fieldInput.type === "select" && (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select a ${fieldInput.label.toLowerCase()}`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fieldInput.options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {fieldInput.type === "multi-select" &&
                        fieldInput.options && (
                          <MultiSelect
                            options={fieldInput.options}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select options"
                          />
                        )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

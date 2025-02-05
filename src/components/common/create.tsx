import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  existingData?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (data: Partial<z.infer<typeof formSchema>>) => void;
  onChange?: (name: keyof T, value: string) => void;
}

const formSchema = z
  .object({
    name: z
      .string()
      .refine((value) => value.trim().length > 0, "Name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must be less than 20 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    identification: z
      .string()
      .min(11, "Identification must be at least 11 characters")
      .max(100, "Identification must be less than 100 characters"),
  })
  .required();

export function CreateUpdateForm<T>({
  isEditable,
  entityName,
  fields,
  existingData = {},
  onSubmit,
  onChange,
}: CreateUpdateFormProps<T>) {
  const [formData, setFormData] =
    useState<Partial<z.infer<typeof formSchema>>>(existingData);

  const form = useForm<Partial<z.infer<typeof formSchema>>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      identification: "",
    },
  });

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
              {fields.map((fieldInput) => (
                <FormField
                  control={form.control}
                  name={fieldInput.name as keyof z.infer<typeof formSchema>}
                  render={({ field, fieldState }) => (
                    <>
                      {fieldInput.type === "text" && (
                        <FormItem key={fieldInput.name}>
                          <FormLabel
                            className={fieldState?.error?.message && "text-red-500"}
                          >
                            {fieldInput.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Type your ${fieldInput.name}`}
                              {...field}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              value={
                                formData[field.name as keyof z.infer<typeof formSchema>] || ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    </>
                  )}
                />
              ))}
            {/* <FormField
            control={form.control}
            name="person_type"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState?.error?.message && 'text-red-500'}>Person Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a person type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NATURAL">Natural</SelectItem>
                    <SelectItem value="LEGAL">Legal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {/* {fields.map((field) => (
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
          ))} */}
        </div>
        {/* <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

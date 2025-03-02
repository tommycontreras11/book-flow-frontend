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
import { Controller, Path, UseFormReturn } from "react-hook-form";

import { FieldValues } from "react-hook-form";
import { MultiSelect } from "../../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export interface IFormField {
  name: string;
  label: string;
  type?:
    | "text"
    | "password"
    | "date"
    | "number"
    | "select"
    | "multi-select"
    | "file";
  defaultValue?: string | number;
  options?: IOptionsFormField[];
}

export interface IOptionsFormField {
  label: string;
  value: string;
}

interface CreateUpdateFormProps<T extends FieldValues> {
  isEditable: boolean;
  entityName: string;
  fields: IFormField[];
  form: UseFormReturn<T>;
  onSubmit: (data: Partial<T>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUpdateForm<T extends FieldValues>({
  isEditable,
  entityName,
  fields,
  form,
  onSubmit,
  isOpen,
  onClose,
}: CreateUpdateFormProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className="w-full max-w-full sm:max-w-lg p-4 sm:p-6"
        aria-describedby={undefined}
        aria-description="Create or update a resource"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditable ? `Update ${entityName}` : `Create ${entityName}`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {fields.map((fieldInput) => (
                <FormField
                  key={fieldInput.name}
                  control={form.control}
                  name={fieldInput.name as Path<T>}
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-1">
                      <FormLabel
                        className={fieldState?.error?.message && "text-red-500"}
                      >
                        {fieldInput.label}
                      </FormLabel>

                      {fieldInput.type === "text" && (
                        <FormControl>
                          <Input
                            placeholder={`Type your ${field.name}`}
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                      )}

                      {fieldInput.type === "date" && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "yyyy-MM-dd")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}

                      {fieldInput.type === "password" && (
                        <FormControl>
                          <Input
                            placeholder={`Type your ${field.name}`}
                            {...field}
                            type="password"
                            className="w-full"
                          />
                        </FormControl>
                      )}

                      {fieldInput.type === "file" && (
                        <Controller
                          name={"file" as Path<T>}
                          control={form.control}
                          render={({ field: { onChange, ref } }) => (
                            <FormControl>
                              <Input
                                type="file"
                                className="w-full"
                                ref={ref} // ✅ Correctly handle ref
                                onChange={(e) =>
                                  onChange(e.target.files?.[0] || null)
                                } // ✅ Handle file change
                              />
                            </FormControl>
                          )}
                        />
                      )}

                      {fieldInput.type === "number" && (
                        <FormControl>
                          <Input
                            placeholder={`Type your ${field.name}`}
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                      )}

                      {fieldInput.type === "select" && (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
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
                            className="w-full"
                          />
                        )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Button spans full width on small screens and aligns right on larger screens */}
              <div className="col-span-1 sm:col-span-2 flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

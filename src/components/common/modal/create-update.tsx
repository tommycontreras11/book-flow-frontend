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

import { DatePicker } from "@/components/ui/date-picker";
import { FieldValues } from "react-hook-form";
import { MultiSelect } from "../../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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
  defaultValue?: string | number | Date;
  blockDatesAfterToday?: boolean;
  options?: IOptionsFormField[];
}

export interface IOptionsFormField {
  label: string;
  value: string;
}

export interface CreateUpdateFormProps<T extends FieldValues> {
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
        className="w-[90vw] max-w-md p-4 sm:p-6"
        aria-describedby={undefined}
        aria-description="Create or update a resource"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditable
              ? `Update ${entityName}`
              : entityName == "Filters"
              ? entityName
              : `Create ${entityName}`}
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

                      {/* {fieldInput.type === "date" && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start pl-3 text-left font-normal",
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
                              key={form.watch(field.name)}
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )} */}

                      {fieldInput.type === "date" && (
                        <FormControl>
                          <DatePicker
                            key={form.watch(field.name)}
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            setDate={(date) => {
                              if (date) {
                                field.onChange(date);
                              }
                            }}
                            disabled={(date) => {
                              if (fieldInput.blockDatesAfterToday) {
                                return date > new Date();
                              }
                              return false;
                            }}
                          />
                        </FormControl>
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
                          key={form.watch(field.name)}
                          onValueChange={field.onChange}
                          defaultValue={form.getValues(field.name as Path<T>)}
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
                            key={form.watch(field.name)}
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

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonTypeEnum } from "@/enums/common.enum";
import { createUser } from "@/lib/user.lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().refine((value) => value.trim().length > 0, "Name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must be less than 20 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    identification: z
      .string()
      .min(11, "Identification must be at least 11 characters")
      .max(100, "Identification must be less than 100 characters"),
    person_type: z.enum([PersonTypeEnum.LEGAL, PersonTypeEnum.NATURAL], {
      required_error: "Person type is required",}),
  })
  .required();

export default function Register() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      identification: "",
      person_type: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser(values)
      .then(() => router.push("/auth/signIn"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState?.error?.message && 'text-red-500'}>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState?.error?.message && 'text-red-500'}>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Type your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState?.error?.message && 'text-red-500'}>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identification"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState?.error?.message && 'text-red-500'}>Identification</FormLabel>
                <FormControl>
                  <Input placeholder="Type your identification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

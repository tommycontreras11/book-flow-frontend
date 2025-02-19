"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    person_type: z.enum([PersonTypeEnum.LEGAL, PersonTypeEnum.NATURAL], {
      required_error: "Person type is required",
    }),
  })
  .required();

export default function SignUp() {
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-6">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your information below to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Type your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="identification"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Identification
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your identification"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="person_type"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Person Type
                          </FormLabel>
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
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Have an account?{" "}
                  <a href="/auth/signIn" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

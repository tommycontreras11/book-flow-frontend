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
import { useAuth } from "@/contexts/auth-context";
import { PersonTypeEnum } from "@/enums/common.enum";
import { toast, useToast } from "@/hooks/use-toast";
import { userFormSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUp() {
  const { register } = useAuth()

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      identification: "",
      person_type: undefined,
    },
  });

  const personTypes = Object.values(PersonTypeEnum).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
  }));

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      await register(values);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Something went wrong",
        variant: "destructive",
        duration: 3000
      });
    }
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
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel
                            className={
                              fieldState?.error?.message && "text-red-500"
                            }
                          >
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your email"
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
                              {personTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
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

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/auth-schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClerkError } from "@/types/clerk-error";
import { AuthErrorMessage } from "../../_components/auth-error-message";

export const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setErrMsg("");
    if (!isLoaded) return;

    try {
      const validatedFields = loginSchema.safeParse(data);

      if (!validatedFields.success) {
        throw new Error(validatedFields.error.message);
      }

      const { email, password } = validatedFields.data;

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        setActive({ session: result.createdSessionId });
        router.push("/select-org");
      }
    } catch (err) {
      const error = err as ClerkError;
      setErrMsg(error.errors[0].message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-12"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="md:w-[300px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  className="md:w-[300px]"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errMsg.length > 0 && <AuthErrorMessage msg={errMsg} />}

        <Button type="submit" className="w-[150px] cursor-pointer font-bold">
          Login
        </Button>
      </form>
    </Form>
  );
};

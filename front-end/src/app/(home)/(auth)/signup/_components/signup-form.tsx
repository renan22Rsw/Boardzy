"use client";

import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AuthErrorMessage } from "../../_components/auth-error-message";
import { useState } from "react";
import { ClerkError } from "@/types/clerk-error";

export const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setErrMsg("");
    if (!isLoaded) return;

    try {
      const validatedFields = signupSchema.safeParse(data);

      if (!validatedFields.success) {
        throw new Error(validatedFields.error.message as string);
      }
      const { name, email, password } = validatedFields.data;

      const result = await signUp.create({
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" ") || "",
        emailAddress: email,
        password: password,
      });

      if (result.status === "complete") {
        setActive({ session: result.createdSessionId });
        router.push("/");
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
        className="flex flex-col items-center space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} className="md:w-[300px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  type="password"
                  placeholder="Password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                  className="md:w-[300px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div id="clerk-captcha"></div>

        {errMsg.length > 0 && <AuthErrorMessage msg={errMsg} />}

        <Button type="submit" className="w-[150px] cursor-pointer font-bold">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

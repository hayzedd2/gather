"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CardWrapper } from "./CardWrapper";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { authClient, signUp } from "@/lib/auth-client";
import { useFormHelpers } from "@/hooks/useFormHelpers";
import { useRouter } from "next/navigation";
import { FormError } from "../FormError";
import { SvgLoading } from "../SvgLoading";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { error, setError, loading, setLoading, resetState } = useFormHelpers();
  const router = useRouter();

  const handleSignUp = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      await signUp.email(
        {
          email: values.email,
          password: values.password,
          name: "test",
          callbackURL: "/dashboard",
        },
        {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            resetState();
            setLoading(true);
          },
          onSuccess() {
            setLoading(false);
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };
  return (
    <CardWrapper
      headerLabel="Create account"
      backButtonLabel="Already have an account?"
      headerDescription="Enter your details to create an account"
      backButtonHref="/login"
      semiButtonLabel="Login"
      type="up"
    >
      <div className="rounded-lg w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSignUp)}
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password*</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={loading}
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute  right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      <p className="mt-1 text-regular font-[500] text-[13px]">
                        Must be at least 8 characters.
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full shadow-md"
            >
              {loading && <SvgLoading />}
              <p className="mt-[0.2rem]"> Sign Up</p>
            </Button>
          </form>
        </Form>
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default RegisterForm;

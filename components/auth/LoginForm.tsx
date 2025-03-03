"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
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
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useFormHelpers } from "@/hooks/useFormHelpers";
import { SvgLoading } from "../reusable-comps/SvgLoading";
import { FormError } from "../forms/FormError";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    error,
    setError,
    loading: isPending,
    setLoading,
    resetState,
  } = useFormHelpers();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const { email, password } = values;
      await signIn.email({
        email,
        password,
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            resetState();
            setLoading(true);
          },
          onSuccess() {
            setLoading(false);
            router.push("/forms");
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      headerDescription="Enter your details to login"
      backButtonHref="/register"
      semiButtonLabel="Sign up"
      type="in"
    >
      <div className="rounded-lg w-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleLogin)}
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
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
                          disabled={isPending}
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
                      <p className="mt-1 mb-3 text-regular font-[500] text-[13px]">
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
              disabled={isPending}
              className="w-full shadow-md"
            >
              {isPending && <SvgLoading />}
              <p className="mt-[0.2rem]"> Sign In</p>
            </Button>
          </form>
        </Form>
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default LoginForm;

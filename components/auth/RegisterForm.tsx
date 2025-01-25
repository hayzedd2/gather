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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isPending = false;
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const payLoad = {
    email: "z@email.com",
    password: "alhameen",
    name: "test",
    image: "https://example.com/image.png",
  };

  const handleSignUp = async (formData: z.infer<typeof RegisterSchema>) => {
    try {
      console.log(formData);
      const { data, error } = await signUp.email(
        {
          email: "test@example.com",
          password: "password1234",
          name: "test",
          image: "https://example.com/image.png",
        },
        {
          onSuccess: () => {
            console.log("Sign up success");
          },
          onError: (ctx) => {
            console.log(payLoad);
            console.log("Sign up error", ctx);
          },
        }
      );
    } catch (err) {
      console.log(err);
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
              {/* {isPending && <SvgLoading />} */}
              <p className="mt-[0.2rem]"> Sign Up</p>
            </Button>
            {/* {isError && <FormError message={error.message} />}
            {isSuccess && <FormSuccess message={data.message} />} */}
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default RegisterForm;

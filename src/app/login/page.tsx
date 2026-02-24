"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginType } from "@/shema/login.shema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { signIn } from "next-auth/react";
export default function Login() {
  const router = useRouter();
  console.log(router);
  

  const form = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const { handleSubmit } = form;
  async function handleLogin(values: LoginType) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, // منع إعادة التوجيه التلقائي
      callbackUrl: "/",
    });
    console.log(res);

    if (res?.ok) {
      toast.success("Login successful", {
        duration: 4000,
        position: "top-center",
      });
      window.location.href = "/"; 
    } else {
      toast.error(res?.error, {
        duration: 50000,
        position: "top-center",
      });
    }
  }
  return (
    <>
      <div className="w-[50%] mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    email :::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    password ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password please"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button className="w-full my-3" type="submit">
            login
          </Button>
        </form>
      </div>
    </>
  );
}
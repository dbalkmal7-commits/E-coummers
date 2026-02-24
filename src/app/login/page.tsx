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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { handleSubmit } = form;

  async function handleLogin(values: LoginType) {
    setLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login successful", {
        duration: 3000,
        position: "top-center",
      });

      router.push("/");
      router.refresh();
    } else {
      toast.error(res?.error || "Invalid credentials", {
        duration: 4000,
        position: "top-center",
      });
    }

    setLoading(false);
  }

  return (
    <div className="w-[50%] mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button disabled={loading} className="w-full my-3" type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
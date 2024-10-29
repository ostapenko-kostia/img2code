"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Input, Label } from "../ui";
import { EyeClosedIcon, EyeIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  handleLogin: (data: FieldValues) => void;
}

const LoginForm: React.FC<Props> = ({ handleLogin }) => {
  const [loginPasswordShow, setLoginPasswordShow] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();
  return (
    <form
      className="p-4 bg-neutral-100 rounded-lg flex flex-col gap-6 dark:bg-neutral-900"
      onSubmit={handleSubmit(handleLogin)}
      autoComplete="on"
    >
      <h2 className="text-center font-bold text-3xl my-5">Log in</h2>
      <div className="flex flex-col items-start gap-3">
        <Label
          htmlFor="login-email"
          className="flex items-center justify-start gap-2 text-lg font-medium"
        >
          <MailIcon /> Email
        </Label>
        <Input
          {...register("email", { required: true })}
          placeholder="123@gmail.com"
          id="login-email"
          required
          aria-label="1"
          type="email"
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center justify-between w-full">
          <Label
            htmlFor="login-password"
            className="flex items-center justify-start gap-2 text-lg font-medium"
          >
            <LockIcon /> Password
          </Label>
          <Link
            href="/reset-password"
            className="text-blue-700 dark:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
        <div className="w-full relative">
          <Input
            {...register("password", { required: true })}
            placeholder="123456"
            id="login-password"
            required
            aria-label="2"
            type={loginPasswordShow ? "text" : "password"}
            className="w-full"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setLoginPasswordShow((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-0"
          >
            {loginPasswordShow ? <EyeIcon /> : <EyeClosedIcon />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="mx-auto" size="lg" aria-label="3">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;

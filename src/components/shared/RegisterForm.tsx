"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Input, Label } from "@/components/ui";
import {
    EyeClosedIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    UserIcon,
  } from "lucide-react";

interface Props {
  handleRegister: (data: FieldValues) => void;
}

const RegisterForm: React.FC<Props> = ({ handleRegister }) => {
  const { register, handleSubmit } = useForm();
  const [registerPasswordShow, setRegisterPasswordShow] =
    useState<boolean>(false);

  return (
    <form
      className="p-4 bg-neutral-100 rounded-lg flex flex-col gap-6"
      onSubmit={handleSubmit(handleRegister)}
      autoComplete="on"
    >
      <h2 className="text-center font-bold text-3xl my-5">Register</h2>
      <div className="flex flex-col items-start gap-3">
        <Label
          htmlFor="register-firstName"
          className="flex items-center justify-start gap-2 text-lg font-medium"
        >
          <UserIcon /> First Name
        </Label>
        <Input
          {...register("firstName", { required: true })}
          placeholder="John"
          id="register-firstName"
          required
          aria-label="1"
          type="text"
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Label
          htmlFor="register-lastName"
          className="flex items-center justify-start gap-2 text-lg font-medium"
        >
          <UserIcon /> Last Name
        </Label>
        <Input
          {...register("lastName", { required: true })}
          placeholder="Doe"
          id="register-lastName"
          required
          aria-label="2"
          type="text"
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Label
          htmlFor="register-email"
          className="flex items-center justify-start gap-2 text-lg font-medium"
        >
          <MailIcon /> Email
        </Label>
        <Input
          {...register("email", { required: true })}
          placeholder="123@gmail.com"
          id="register-email"
          required
          aria-label="3"
          type="email"
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Label
          htmlFor="register-password"
          className="flex items-center justify-start gap-2 text-lg font-medium"
        >
          <LockIcon /> Password
        </Label>
        <div className="w-full relative">
          <Input
            {...register("password", { required: true })}
            placeholder="123456"
            id="register-password"
            required
            aria-label="4"
            type={registerPasswordShow ? "text" : "password"}
            className="w-full"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setRegisterPasswordShow((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-0"
          >
            {registerPasswordShow ? <EyeIcon /> : <EyeClosedIcon />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="mx-auto" size="lg" aria-label="5">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

"use client";

import authService from "@/api/authService/authService";
import {
  Button,
  Input,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { KeyIcon, MailIcon, MoveLeftIcon, Repeat1Icon } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [state, setState] = useState<number>(0);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();

  const form0Handler = (data: FieldValues) => {
    toast.promise(authService.resetPassword({ email: data.email }), {
      loading: "Loading...",
      success: () => {
        setEmail(data.email);
        setState(1);
        return "Verification code sent successfully";
      },
      error: (err) => err.message,
    });
  };

  const form1Handler = () => {
    if (otp?.length === 6) {
      setState(2);
    } else {
      toast.error("Please enter a valid verification code");
    }
  };

  const form2Handler = async (data: FieldValues) => {
    if (data["new-password"] === data["repeat-new-password"]) {
      if (email && otp) {
        toast.loading("Loading...", { duration: 1000 });
        const res = await authService.changePassword({
          email,
          otp,
          password: data["new-password"],
        });
        if (res?.status === 200) {
          toast.success("Password changed successfully");
        } else {
          toast.error("An error occurred. Maybe, verification code is wrong");
        }
      } else {
        toast.error("Email and verification code are required");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <section className="flex flex-col w-full items-center gap-6 pt-6">
      <h2 className="text-3xl font-bold">Reset Password</h2>
      {state === 0 && (
        <form
          onSubmit={handleSubmit(form0Handler)}
          className="w-96 p-8 shadow-lg shadow-[rgba(0,0,0,0.25)] dark:shadow-sm dark:shadow-[rgba(255,255,255,0.25)] rounded-xl flex flex-col items-center gap-4"
        >
          <h3 className="text-xl">You will get a verification code</h3>
          <div className="w-full flex flex-col gap-2 items-start">
            <Label className="flex items-center gap-2 w-full">
              <MailIcon /> Email
            </Label>
            <Input
              aria-label="1"
              {...register("email", { required: true })}
              required
              placeholder="123@gmail.com"
            />
          </div>
          <Button type="submit" aria-label="2">
            Send Verification Code
          </Button>
        </form>
      )}
      {state === 1 && (
        <form
          onSubmit={handleSubmit(form1Handler)}
          className="w-96 p-8 shadow-lg shadow-[rgba(0,0,0,0.25)] dark:shadow-sm dark:shadow-[rgba(255,255,255,0.25)] rounded-xl flex flex-col items-center gap-4 relative"
        >
          <Button
            className="absolute top-2 left-2"
            variant="outline"
            size="icon"
            onClick={() => setState(0)}
          >
            <MoveLeftIcon />{" "}
          </Button>
          <h3 className="text-xl">Enter your verification code</h3>
          <InputOTP
            aria-label="1"
            onChange={(e) => setOtp(e)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit" aria-label="2">
            Reset Password
          </Button>
        </form>
      )}
      {state === 2 && (
        <form
          onSubmit={handleSubmit(form2Handler)}
          className="w-[500px] py-8 px-14 shadow-lg shadow-[rgba(0,0,0,0.25)] dark:shadow-sm dark:shadow-[rgba(255,255,255,0.25)] rounded-xl flex flex-col items-center gap-4 relative"
        >
          <Button
            className="absolute top-2 left-2"
            variant="outline"
            size="icon"
            onClick={() => setState(1)}
          >
            <MoveLeftIcon />{" "}
          </Button>
          <h3 className="text-xl">You will get a verification code</h3>
          <div className="w-full flex flex-col gap-2 items-start">
            <Label className="flex items-center gap-2 w-full">
              <KeyIcon /> New password
            </Label>
            <Input
              aria-label="1"
              {...register("new-password", { required: true })}
              required
              placeholder="123456"
            />
          </div>
          <div className="w-full flex flex-col gap-2 items-start">
            <Label className="flex items-center gap-2 w-full">
              <Repeat1Icon /> Repeat new password
            </Label>
            <Input
              aria-label="2"
              {...register("repeat-new-password", { required: true })}
              required
              placeholder="123456"
            />
          </div>
          <Button type="submit" aria-label="3">
            Change Password
          </Button>
        </form>
      )}
    </section>
  );
};

export default ResetPasswordPage;

"use client";

import { MailIcon, MessageCircleMoreIcon } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
} from "../ui";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import userService from "@/api/userService/userService";

const ContactUsButton: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const formHandler = (data: FieldValues) => {
    const { email, message } = data;
    toast.promise(
      new Promise(async (resolve, reject) => {
        const res = await userService.contactSupport({ email, message });
        if (res?.status === 200) {
          resolve("Message sent successfully");
        } else {
          reject("Something went wrong");
        }
      }),
      {
        error: (err) => err,
        loading: "Sending...",
        success: "Message sent successfully",
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">Contact Us</p>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-3 p-4">
        <DialogTitle className="text-2xl">Contact Us</DialogTitle>
        <form
          className="w-full mt-2 flex flex-col items-center gap-6"
          onSubmit={handleSubmit(formHandler)}
        >
          <div className="flex flex-col items-start w-full gap-2">
            <Label className="flex items-center gap-2 text-lg">
              <MailIcon /> Your email
            </Label>
            <Input
              {...register("email", { required: true })}
              placeholder="123@gmail.com"
              aria-label="1"
            />
          </div>

          <div className="flex flex-col items-start w-full gap-2">
            <Label className="flex items-center gap-2 text-lg">
              <MessageCircleMoreIcon /> Message
            </Label>
            <Textarea
              className="max-h-[300px]"
              required
              {...register("message", { required: true })}
              placeholder="Enter your message here..."
              aria-label="2"
            />
          </div>

          <Button type="submit" size="lg" aria-label="3">
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsButton;

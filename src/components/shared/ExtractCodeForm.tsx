"use client";

import { Label, Button, Switch } from "@/components/ui";
import { IAIResponse } from "@/typing/interfaces";
import { Star, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CodeBlock from "./CodeBlock";
import ImageCard from "./ImageCard";
import { Container } from "./Container";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import convertService from "@/api/convertService/convertService";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getRefreshToken } from "@/api/authService/authHelper";
import { TIER } from "@/typing/enums";

const ExtractCodeForm = () => {
  // State
  const [file, setFile] = useState<File | null>(null);
  const [convertedData, setConvertedData] = useState<IAIResponse | null>(null);
  const [state, setState] = useState(0);
  const [creditsAmount, setCreditsAmount] = useState<number | null>(null);

  // Inits
  const { push } = useRouter();
  const isAuth: boolean = !!getRefreshToken();
  const { register, handleSubmit, control } = useForm();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });
  const { getData } = useVisitorData();
  const { user } = useAuthStore();

  // Fetch Credits
  useEffect(() => {
    const fetchCredits = async () => {
      if (isAuth) {
        setCreditsAmount(Number(user?.credits ?? "0"));
      } else {
        try {
          const data = await getData({ ignoreCache: true });
          const res = await convertService.getRemainingCredits(data.visitorId);
          if (res.data.conversionsLeft)
            setCreditsAmount(res.data.conversionsLeft);
          else throw new Error("");
        } catch (error) {
          toast.error(`Could not fetch credits, ${error}`);
          setTimeout(() => push("/"), 2000);
        }
      }
    };

    fetchCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  // Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };
  const submitHandler = async (data: FieldValues) => {
    const visitorId = (await getData({ ignoreCache: true })).visitorId;
    if (file) {
      const promise = convertService.convert({
        file,
        comments: data.comments,
        fingerprint: visitorId,
      });
      toast.promise(promise, {
        loading: "Converting...",
        success: (response) => {
          setConvertedData(response.data);
          setState(1);
          return "Converted successfully";
        },
        error: "The programming language was not recognized, or you do not have enough credits",
      });
    } else {
      toast.error("No file selected");
    }
  };

  // JSX
  return (
    <div
      onPaste={(e) => {
        setFile(e.clipboardData.files[0]);
      }}
    >
      {state === 0 && (user || creditsAmount) ? (
        <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
          <div
            className="w-full flex flex-col items-center justify-center"
            {...getRootProps()}
          >
            <p className="text-lg font-semibold mb-2 max-xs:text-base max-xs:text-center">
              {file ? file.name : "No file selected"}
            </p>
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-neutral-900 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  width={200}
                  height={200}
                  alt="Uploaded image"
                  className="rounded-md aspect-square object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloudIcon size={40} color="#9CA3AF" className="mb-3" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 max-xs:text-xs max-xs:text-center max-xs:px-1">
                    <span className="font-semibold">Click to upload</span> or
                    drag & drop or paste from{" "}
                    <span className="font-semibold">clipboard</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              )}
              <input
                {...getInputProps()}
                {...register("file")}
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </Label>
          </div>

          <div className="mx-auto flex items-center flex-col">
            <h3 className="text-xl font-semibold my-4">Settings</h3>

            <div className="flex items-center gap-2">
              <Controller
                name="comments"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="comments-checkbox"
                    checked={field.value === "on"}
                    onCheckedChange={(checked) => {
                      if (isAuth) {
                        if (user?.tier === TIER.FREE) {
                          push("/pricing");
                        } else {
                          field.onChange(checked ? "on" : "off");
                        }
                      } else {
                        push("/auth");
                      }
                    }}
                  />
                )}
              />

              <Label
                className="text-lg font-semibold"
                htmlFor="comments-checkbox"
              >
                Comments
              </Label>
              <Star size={24} color="#ea580c" />
            </div>

            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="mt-6 border border-solid border-slate-300 hover:bg-slate-800 hover:text-slate-300"
            >
              Convert
            </Button>

            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              Credits left:{" "}
              <span className="text-orange-600 dark:text-orange-400">
                {user
                  ? user?.tier == TIER.FREE
                    ? creditsAmount
                    : "Unlimited"
                  : creditsAmount}
              </span>
            </p>
          </div>
        </form>
      ) : (
        state === 0 && <p className="text-3xl text-center mt-6">Loading...</p>
      )}
      {state === 1 && (
        <Container className="max-w-[900px] flex flex-col items-center justify-center">
          {convertedData && file ? (
            <>
              <ImageCard file={file} />
              <div className="relative flex items-center justify-center w-full max-xs:flex-col max-xs:justify-normal max-xs:gap-3">
                <h3 className="text-3xl font-semibold my-4">Result</h3>
                <Button
                  onClick={() => window.location.reload()}
                  className="absolute z-10 top-1/2 -translate-y-1/2 right-0 max-xs:static"
                >
                  Convert more!
                </Button>
              </div>
              <CodeBlock
                code={convertedData.output}
                language={convertedData.language.toLowerCase()}
              />
            </>
          ) : (
            <p className="text-lg font-semibold my-4">Something went wrong</p>
          )}
        </Container>
      )}
    </div>
  );
};

export default ExtractCodeForm;

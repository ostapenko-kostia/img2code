"use client";

import {Label, Button, Switch} from "@/components/ui";
import {AiResponse} from "@/typing/interfaces";
import {UploadCloudIcon} from "lucide-react";
import {useState} from "react";
import {Controller, FieldValues, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import CodeBlock from "./CodeBlock";
import ImageCard from "./ImageCard";
import {Container} from "./Container";
import {useDropzone} from "react-dropzone";
import Image from "next/image";
import convertService from "@/services/convertService";

const ExtractCodeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedData, setConvertedData] = useState<AiResponse | null>(null);
  const [state, setState] = useState(0);

  const {register, handleSubmit, control} = useForm();
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  };

  const submitHandler = (data: FieldValues) => {
    if (file) {
      const promise = convertService.convert(file, data.comments);
      toast.promise(promise, {
        loading: "Converting...",
        success: (data) => {
          setConvertedData(data);
          setState(1);
          return "Converted successfully";
        },
        error: (err) => err.message,
      });
    } else {
      toast.error("No file selected");
    }
  };

  return (
    <div
      onPaste={(e) => {
        setFile(e.clipboardData.files[0]);
      }}
    >
      {state === 0 && (
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
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloudIcon size={40} color="#9CA3AF" className="mb-3"/>
                  <p
                    className="mb-2 text-sm text-gray-500 dark:text-gray-400 max-xs:text-xs max-xs:text-center max-xs:px-1">
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
                render={({field}) => (
                  <Switch
                    id="comments-checkbox"
                    checked={field.value === "on"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "on" : "off")
                    }
                  />
                )}
              />

              <Label
                className="text-lg font-semibold"
                htmlFor="comments-checkbox"
              >
                Comments
              </Label>
            </div>

            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="mt-6 border border-solid border-slate-300 hover:bg-slate-800 hover:text-slate-300"
            >
              Convert
            </Button>
          </div>
        </form>
      )}
      {state === 1 && (
        <Container className="max-w-[900px] flex flex-col items-center justify-center">
          {convertedData && file ? (
            <>
              <ImageCard file={file}/>
              <div
                className="relative flex items-center justify-center w-full max-xs:flex-col max-xs:justify-normal max-xs:gap-3">
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

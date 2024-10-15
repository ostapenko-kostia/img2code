"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "../ui";
import { CopyIcon, DownloadIcon } from "lucide-react";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

interface Props {
  code: string;
  language: string;
}

const CodeBlock: React.FC<Props> = ({ code, language }) => {
  const handleDownload = () => {
    if (code) {
      const blob = new Blob([code], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${language}-${Date.now()}.txt`);
    }
  };
  return (
    <div
      className="p-8 relative"
      style={{ backgroundColor: `${atomOneDark.hljs.background}` }}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          variant="default"
          size="icon"
          className="bg-transparent dark:hover:bg-neutral-800"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast.success("Copied!");
          }}
        >
          <CopyIcon className="text-white" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={handleDownload}
          className="bg-transparent dark:hover:bg-neutral-800"
        >
          <DownloadIcon className="text-white" />
        </Button>
      </div>

      <SyntaxHighlighter language={language.toLowerCase()} style={atomOneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

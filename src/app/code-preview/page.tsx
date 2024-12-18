"use client";

import convertService from "@/api/convertService/convertService";
import CodeBlock from "@/components/shared/CodeBlock";
import { Container } from "@/components/shared/Container";
import { IHistoryResponse } from "@/typing/interfaces";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const CodePageSnippet: React.FC = () => {
  const conversionId = useSearchParams().get("conversionId");
  const [conversion, setConversion] = useState<IHistoryResponse | undefined>(
    undefined
  );

  useEffect(() => {
    const getConversion = async () => {
      if (conversionId) {
        const res = await convertService.getHistory();
        if (res && res.data) {
          setConversion(res.data.find((c) => c.conversion_id === conversionId));
        } else notFound();
      } else notFound();
    };
    getConversion();
  }, [conversionId]);

  return conversionId && conversion ? (
    <Container className="max-w-[900px]">
      <h2 className="text-center font-bold text-4xl mt-6">Code Snippet</h2>
      <div className="mx-auto mt-6">
        <CodeBlock code={conversion.code} language={conversion.code_language} />
      </div>
    </Container>
  ) : (
    <h2 className="text-center text-2xl mt-6">Loading...</h2>
  );
};

const CodePage: React.FC = () => {
  return (
    <Suspense>
      <CodePageSnippet />
    </Suspense>
  );
};

export default CodePage;

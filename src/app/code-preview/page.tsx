import CodeBlock from "@/components/shared/CodeBlock";
import { Container } from "@/components/shared/Container";
import { notFound } from "next/navigation";

interface SearchParams {
  searchParams: {
    code: string;
    language: string;
  };
}

const CodePage: React.FC<SearchParams> = ({ searchParams }) => {
  const code = searchParams?.code;
  const language = searchParams?.language;

  if (!code || !language) notFound();

  return (
    code &&
    language && (
      <Container className="max-w-[900px]">
        <CodeBlock code={code} language={language} />
      </Container>
    )
  );
};

export default CodePage;

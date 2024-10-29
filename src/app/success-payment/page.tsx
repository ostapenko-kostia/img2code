import { Button } from "@/components/ui";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <section className="flex items-center w-full flex-col gap-4">
      <h2 className="font-bold text-3xl mt-6">Success!</h2>
      <p>Thank you for your payment! Your order will be processed shortly.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </section>
  );
};

export default SuccessPage;

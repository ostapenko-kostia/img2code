import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";

interface Props {
  className?: string;
  outlined?: boolean;
  variant: "free" | "pro" | "premium";
  link: string;
}

const PricingCard: React.FC<Props> = ({
  className,
  outlined = false,
  variant,
  link,
}) => {
  const fields = {
    free: {
      title: "Free",
      price: 0,
      features: [
        "10 Conversions",
        "Upto 4,000 characters in input code / conversion",
        "Email Support",
      ],
      buttonText: "Get Started",
    },
    pro: {
      title: "Pro",
      price: 12.99,
      features: ["All premium features", "Max File size - 10MB"],
      buttonText: "Subscribe",
    },
    premium: {
      title: "Premium",
      price: 8.99,
      features: [
        "All free features",
        "Unlimited credits",
        "Max File size - 5MB",
        "Code in comments",
        "History of conversions",
        "Quicker conversions",
        "Priority Email Support",
      ],
      buttonText: "Subscribe",
    },
  };
  return (
    <article
      className={cn(
        "flex flex-col items-center gap-3 bg-neutral-100 rounded-xl dark:bg-neutral-900 p-6 h-full",
        outlined && "border-[3px] border-solid border-black",
        className
      )}
    >
      <h3 className="text-gray-500 text-xl font-bold">
        {fields[variant].title}
      </h3>
      <p className="text-gray-600 text-xl dark:text-gray-500">
        <span className="font-black text-4xl text-black dark:text-white">
          ${fields[variant].price}
        </span>
        / month
      </p>

      <ul className="flex flex-col items-start gap-3 mt-4">
        {fields[variant].features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon /> {feature}
          </li>
        ))}
      </ul>

      <Link href={link}>
        <Button className="mt-4">{fields[variant].buttonText}</Button>
      </Link>
    </article>
  );
};

export default PricingCard;

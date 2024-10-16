import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex gap-6 items-center h-14 mt-12">
        <h1 className="font-bold text-5xl">404</h1>
        <hr className="w-[2px] h-full border-none bg-black dark:bg-white" />
        <span className="text-xl">Not Found</span>
      </div>
      <Link href='/' className="text-blue-700 text-lg dark:text-blue-500">Return to Home</Link>
    </div>
  );
};

export default NotFoundPage;

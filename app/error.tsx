"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-4xl min-h-screen flex flex-col gap-10 justify-center items-center">
      <h2 className="text-4xl lg:text-8xl font-semibold">{error.message} :(</h2>
      <Link className="text-black bg-gray-200 hover:bg-white px-5 py-2 rounded-md" href="/">Return Home</Link>
    </div>
  );
}

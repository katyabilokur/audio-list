import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Category Not Found</h1>
      <p className="text-gray-600 mt-2">
        The category you are looking for does not exist
      </p>
      <Link href="/" className="text-blue-500 mt-4 inline-block">
        Go back to Home
      </Link>
    </div>
  );
}

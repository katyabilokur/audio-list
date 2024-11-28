import Link from "next/link";

export default function HomeIntro() {
  return (
    <div className="flex flex-col gap-2">
      <h1>MyList</h1>
      <p>Please login first to use Audio List App</p>
      <Link className="text-orange-600" href="/login">
        Log in
      </Link>
      <p>Some little app description to be here</p>
    </div>
  );
}

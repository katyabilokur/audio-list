import Image from "next/image";
import Link from "next/link";
import welcomePic from "@/public/images/welcome.webp";

export default function HomeIntro() {
  return (
    <div className="h-screen bg-gradient-to-r from-primary_rose-200 via-primary_blue-200 to-primary_tur-200 bg-[length:200%_200%] animate-gradient-bg">
      <div className=" flex w-160 mx-auto flex-col gap-4 items-center justify-center">
        <Image
          src={welcomePic}
          placeholder="blur"
          quality={100}
          width={300}
          height={300}
          loading="lazy"
          alt="Intro Audio List app picture"
          className="rounded-3xl border-1 border-zinc-400"
        />
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-zinc-800 md:text-5xl lg:text-6xl">
          Audio List
        </h1>
        <h3 className="text-2xl font-medium">Manage your shopping</h3>
        <p className="text-lg text-zinc-600">
          Planning and managing shopping was never that easy before! Add
          shopping items with just your voice. Organize lists effortlessly, and
          share them with family and friends.
        </p>
        <Link
          className="text-white text-lg bg-primary_purple-600 border-primary_purple-500 hover:bg-primary_purple-700 focus:ring-4 focus:ring-primary_purple-300 font-semibold rounded-xl px-12 py-2.5 focus:outline-none"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

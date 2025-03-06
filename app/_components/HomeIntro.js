import Image from "next/image";
import Link from "next/link";
import welcomePic from "@/public/images/welcome.webp";

export default function HomeIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary_rose-200 via-primary_blue-200 to-primary_tur-200 bg-[length:200%_200%] animate-gradient-bg">
      <div className="flex w-80 sm:min-w-160 mx-auto flex-col gap-4 items-center justify-center">
        {/* <Image
          src={welcomePic}
          placeholder="blur"
          quality={100}
          loading="lazy"
          alt="Intro Audio List app picture"
          className="w-72 sm:w-80 h-72 sm:h-80 rounded-3xl border border-white mt-4 mb-3 sm:mt-8 sm:mb-4"
        /> */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 overflow-hidden rounded-3xl border border-white mt-4 mb-3 sm:mt-8 sm:mb-4">
          <Image
            src={welcomePic}
            placeholder="blur"
            quality={100}
            loading="lazy"
            alt="Intro picture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[150%] h-full transform -translate-x-full animate-scanline"></div>
        </div>
        <h1 className="mb-2 text-4xl sm:text-5xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-primary_tur-700 from-primary_purple-800">
          Audio List
        </h1>
        <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-medium text-zinc-600">
          Manage your shopping
        </h3>
        {/* <hr className="w-48 h-1 mx-auto bg-primary_tur-300 border-0 rounded-sm md:my-10"></hr> */}
        <p className="text-base sm:text-lg text-zinc-500 italic mb-3">
          Planning and managing shopping was never that easy before! Add
          shopping items with just your voice. Organize lists effortlessly, and
          share them with family and friends.
        </p>
        <Link
          className="mb-2 sm:mb-4 text-white text-base sm:text-lg bg-primary_purple-600 border border-primary_purple-500 hover:bg-primary_purple-700 focus:ring-4 focus:ring-primary_purple-300 font-semibold rounded-2xl px-16 sm:px-20 py-2 sm:py-3 focus:outline-none"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

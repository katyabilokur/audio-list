import SignInButton from "../_components/SignInButton";
import { ShoppingBagIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex justify-center items-start pt-24 min-h-screen bg-gradient-to-r from-primary_rose-200 via-primary_blue-200 to-primary_tur-200 bg-[length:200%_200%] animate-gradient-bg">
      <div className="text-center p-8 sm:p-16 pb-16 sm:pb-20 flex flex-col gap-8 w-80 sm:w-96 rounded-lg bg-white border border-primary_purple-600">
        <div className="mx-auto relative w-16 h-16">
          <ShoppingBagIcon className="absolute inset-0 h-16 w-16 text-zinc-700 opacity-80" />
          <MicrophoneIcon className="absolute inset-0 h-12 w-12 text-zinc-700 opacity-90 translate-x-3 translate-y-3" />
        </div>

        <h2 className="mb-2 sm:mb-4 text-3xl sm:text-4xl font-extrabold text-zinc-600">
          Welcome!
        </h2>
        <p className="text-base sm:text-xl text-zinc-500 mb-3">
          Sign in to start using{" "}
          <span className="leading-none tracking-tight font-medium text-transparent bg-clip-text bg-gradient-to-r to-primary_tur-700 from-primary_purple-800">
            Audio List
          </span>
        </p>
        <SignInButton />
      </div>
    </div>
  );
}

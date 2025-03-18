"use client";

import { shareList } from "@/app/_lib/actions";
import { useState } from "react";
import ExistingShares from "../ExistingShares";
import toast, { Toaster } from "react-hot-toast";
import { maxSharesNumber } from "@/app/_lib/dataHelpers";
import Card from "../visual/Card";
import { useFormStatus } from "react-dom";

function ShareForm({ categoryName, existingShares }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [curShares, setCurShares] = useState([...existingShares]);

  function validateEmail(email) {
    if (!email.trim()) return "Please provide an email for sharing";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please provide a valid email format";
    if (curShares.includes(email))
      return `You are already sharing ${categoryName} with this person`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    const result = await shareList(new FormData(e.target));
    setCurShares((cur) => [...cur, email]);

    if (result?.success) {
      toast.success(
        `Your ${categoryName} list was shared successfully with ${email}!`
      );
      setEmail("");
    } else {
      toast.error(
        `Failed to share ${categoryName} with ${email}. Please try again.`
      );
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setError("");
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <div className="flex flex-col gap-8 items-center">
        {curShares.length > 0 && (
          <ExistingShares categoryName={categoryName} shares={curShares} />
        )}

        {curShares.length < maxSharesNumber && (
          <Card extraStyling="pt-4 pb-8 sm:py-8 px-4 sm:px-8 md:w-160">
            <form onSubmit={handleSubmit}>
              <p className="mb-6 text-start">
                Provide an email of a person with who you want to share your
                {categoryName} list
              </p>
              <div className="flex gap-4 flex-col w-full">
                <input
                  type="hidden"
                  value={JSON.stringify(curShares)}
                  name="existingShares"
                />
                <input type="hidden" value={categoryName} name="categoryName" />

                <input
                  type="email"
                  placeholder="share.with@email.com"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_purple-600 hover:border-primary_purple-300 shadow-sm focus:shadow  max-w-sm min-w-[200px]"
                />
                <p className="text-primary_rose-500 text-start">{error}</p>
              </div>
              <Button />
            </form>
          </Card>
        )}
        {curShares.length >= maxSharesNumber && (
          <p>
            You used maximum shares per category which is {maxSharesNumber}{" "}
            users
          </p>
        )}
      </div>
    </>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="mt-5 mb-2 sm:mb-4 text-white text-sm sm:text-base bg-primary_purple-600 border hover:bg-primary_purple-700 focus:ring-4 focus:ring-primary_purple-300 font-medium rounded-2xl px-10 sm:px-12 py-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:text-zinc-200"
    >
      {pending ? "Sharing..." : "Share"}
    </button>
  );
}

export default ShareForm;

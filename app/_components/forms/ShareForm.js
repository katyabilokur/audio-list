"use client";

import { shareList } from "@/app/_lib/actions";
import { useState } from "react";
import ExistingShares from "../ExistingShares";
import toast, { Toaster } from "react-hot-toast";
import { maxSharesNumber } from "@/app/_lib/dataHelpers";

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
      <div className="flex flex-col gap-3">
        {curShares.length > 0 && (
          <ExistingShares categoryName={categoryName} shares={curShares} />
        )}
        {curShares.length < maxSharesNumber && (
          <form onSubmit={handleSubmit}>
            <p>
              Provide an email of a person with who you want to share your
              {categoryName} list
            </p>
            <div className="flex gap-4 flex-col">
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
              />
              <p className="text-red-500">{error}</p>

              <div className="flex gap-4">
                <button>Share</button>
              </div>
            </div>
          </form>
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

export default ShareForm;

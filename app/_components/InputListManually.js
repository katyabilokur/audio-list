"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { insertNewItems, structureText } from "../_lib/helpers";

export default function InputListManually({
  setProcessingStatus,
  setProcessingType,
  userId,
}) {
  const t = useTranslations("General");
  const f = useTranslations("Forms");
  const ht = useTranslations("Home");

  const router = useRouter();

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function validateItemsText(itemsText) {
    const allowedPattern =
      /^[\u0041-\u005A\u0061-\u007A\u00C0-\u024F\u0370-\u03FF\u0400-\u04FF\u0530-\u1FFF\u2C00-\u2C5F\u1F00-\u1FFF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF\u1F300-\u1F64F\u2000-\u206F\u2E80-\u2EFF\u3000-\u303F\uFF00-\uFFEF\u0030-\u0039\s,.:\"'\-+%;()\[\]]*$/;
    const text = itemsText.trim();
    if (!text) return f("addItemsManuallyValidationEmpty");
    if (!allowedPattern.test(text))
      return f("addItemsManuallyValidationPattern");

    const blockedPatterns = [
      /<[^>]*>/, // Blocks HTML tags like <script>, <img>, etc.
      /[{}]/, // Blocks curly braces (often used in JavaScript injections)
      /[\\\/]/, // Blocks backslashes and forward slashes
      /javascript:/i, // Blocks JavaScript injection attempts
    ];

    for (const pattern of blockedPatterns) {
      if (pattern.test(text)) {
        return f("addItemsManuallyValidationHarmful");
      }
    }

    return "";
  }

  async function handleSubmit(e) {
    const formData = new FormData(e.currentTarget);
    const formText = formData.get("text");
    e.preventDefault();

    const validationError = validateItemsText(formText);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    //1. Send data to structure
    setProcessingStatus(true);
    setProcessingType(`${ht("structuringData")}`);
    const csvText = await structureText(formText, userId);

    //2. Split csv text and save result to the DB Items table
    setProcessingType(`${ht("savingList")}`);
    const urlId = `${userId}-text-${Date.now()}`;
    await insertNewItems(csvText, userId, urlId);

    //3. Redirect to check data
    setProcessingType(`${ht("redirectingToReview")}`);
    router.push(`/review/${urlId}`);
  }

  function handleTextChange(e) {
    setText(e.target.value);
    setError("");
  }

  return (
    <div className="px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <p className="mb-2 text-zinc-700 text-lg">
          {f("addItemsManuallyText")}
        </p>
        <p className="text-primary_rose-500 text-start">{error}</p>
        <textarea
          rows="5"
          name="text"
          onChange={handleTextChange}
          className="block p-2.5 w-full sm:w-96 text-base bg-zinc-50 rounded-lg border border-zinc-300 focus:text-primary_tur-700 focus:ring-2 focus:ring-primary_tur-300 focus:outline-none"
          placeholder={f("addItemsManuallyPlaceholder")}
        ></textarea>

        <button
          disabled={text.length < 5}
          className="mt-5 mb-2 sm:mb-4 text-lg font-semibold text-white sm:text-base bg-primary_tur-500 border hover:bg-primary_tur-400 focus:ring-4 focus:ring-primary_purple-300 rounded-2xl px-10 sm:px-12 py-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:text-zinc-200"
        >
          {t("add")}
        </button>
      </form>
    </div>
  );
}

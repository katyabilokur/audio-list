"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function InputListManually({
  setProcessingStatus,
  setProcessingType,
  userId,
  language,
}) {
  const t = useTranslations("General");
  const h = useTranslations("Forms");
  function handleSubmit() {}

  const [text, setText] = useState("");

  return (
    <div className="px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <p className="mb-2 text-zinc-700 text-lg">
          {h("addItemsManuallyText")}
        </p>
        <textarea
          rows="5"
          onChange={(e) => setText(e.target.value)}
          className="block p-2.5 w-full sm:w-96 text-base bg-zinc-50 rounded-lg border border-zinc-300 focus:text-primary_tur-700 focus:ring-2 focus:ring-primary_tur-300 focus:outline-none"
          placeholder={h("addItemsManuallyPlaceholder")}
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

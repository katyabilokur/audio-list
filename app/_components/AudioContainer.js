"use client";

import { useState } from "react";
import AudioRecorder from "./AudioRecorder";
import SpinnerWithText from "./SpinnerWithText";
import InputListManually from "./InputListManually";
import { useTranslations } from "use-intl";

export default function AudioContainer({ children, curUserId, language }) {
  const [processingStatus, setProcessingStatus] = useState(false);
  const [processingType, setProcessingType] = useState("");

  const t = useTranslations("General");

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-6 mt-5 sm:mt-8 ">
        {children}
        <AudioRecorder
          setProcessingStatus={setProcessingStatus}
          setProcessingType={setProcessingType}
          className="mt-auto"
          userId={curUserId}
          language={language}
        />
      </div>
      <div className="inline-flex items-center justify-center w-full my-0 sm:my-3">
        <hr className="w-56 h-px my-8 text-zinc-600 bg-zinc-400 border-0" />
        <span className="absolute px-3 font-semibold -translate-x-1/2 bg-primary_tur-100 left-1/2">
          {t("or")}
        </span>
      </div>

      <InputListManually
        setProcessingStatus={setProcessingStatus}
        setProcessingType={setProcessingType}
        userId={curUserId}
        language={language}
      />
      {processingStatus && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <SpinnerWithText text={processingType} />
        </div>
      )}
    </div>
  );
}

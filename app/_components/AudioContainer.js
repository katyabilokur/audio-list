"use client";

import { useState } from "react";
import AudioRecorder from "./AudioRecorder";
import SpinnerWithText from "./SpinnerWithText";

export default function AudioContainer({ children, curUserId }) {
  const [processingStatus, setProcessingStatus] = useState(false);
  const [processingType, setProcessingType] = useState("");

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-6 mt-5 sm:mt-8 ">
        <AudioRecorder
          setProcessingStatus={setProcessingStatus}
          setProcessingType={setProcessingType}
          className="mt-auto"
          userId={curUserId}
        />
        {children}
      </div>
      {processingStatus && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <SpinnerWithText text={processingType} />
        </div>
      )}
    </div>
  );
}

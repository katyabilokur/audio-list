"use client";
import { useState, useRef } from "react";
import RecordButton from "./RecordButton";
import {
  LockClosedIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import {
  deleteFileFromStorage,
  insertNewItems,
  structureText,
  transcribeAudio,
  uploadFileToStorage,
} from "../_lib/helpers";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const mimeType = "audio/webm";

const AudioRecorder = ({
  userId,
  setProcessingStatus,
  setProcessingType,
  language,
}) => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const router = useRouter();

  const t = useTranslations("Home");

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setProcessingStatus(true);
    setProcessingType(`${t("creatingAudio")}`);
    setRecordingStatus("inactive");

    //Stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //1. Create a blob file from the audio chunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      //2. Save recording file to the storage
      setProcessingType(`${t("savingAudio")}`);
      const url = await uploadFileToStorage(audioBlob, userId);
      if (url.publicUrl) {
        //If file is created and saved begging data processing
        //3. Transcribe audio to text with Assembly AI
        setProcessingType(`${t("transcribingAudio")}`);
        const recordedText = await transcribeAudio(url.publicUrl, language);
        //TEST DATA
        // const recordedText = "a kid's book, some liquid to wash the floor";

        //4. Text structuring with Anthropic AI. Returns text in csv limited format
        setProcessingType(`${t("structuringData")}`);
        const csvText = await structureText(recordedText, userId);
        //TEST DATA
        // const csvText =
        //   "grocery,1,pack,potato,\n" +
        //   "grocery,1,item,sweet-potato,big\n" +
        //   "grocery,2,packs,berries,\n" +
        //   "grocery,1,kilo,banana,\n" +
        //   "grocery,,,veggies,some\n" +
        //   "grocery,2,liters,milk,big";

        //5. Split csv text and save result to the DB Items table
        setProcessingType(`${t("savingList")}`);
        const urlId = url.publicUrl.split("/").at(-1).split(".")[0];
        await insertNewItems(csvText, userId, urlId);

        //6. Clear audioChunks and file from the storage
        setProcessingType(`${t("cleaningAudio")}`);
        setAudioChunks([]);
        await deleteFileFromStorage(url.publicUrl);

        setProcessingType(`${t("redirectingToReview")}`);
        router.push(`/review/${urlId}`);
      }

      //Part1: creates a playable URL from the blob file. Can be downloaded or played if needed. So far removed
      // const audioUrl = URL.createObjectURL(audioBlob);
      // setAudio(audioUrl);
    };
  };

  return (
    <div className="flex flex-col items-center">
      {/* {processingStatus && <SpinnerWithText text={processingType} />} */}
      <div className="w-80 sm:w-96 audio-controls h-100 w-100 flex flex-col items-center gap-4 mt-2 mb-4">
        {!permission ? (
          <>
            <RecordButton
              onClick={getMicrophonePermission}
              classToAdd="bg-amber-500 hover:bg-amber-400"
            >
              <LockClosedIcon className="h-8 w-8" />
            </RecordButton>
            <h4 className="text-zinc-700 text-lg">{t("getPermissions")}</h4>
          </>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <>
            <RecordButton
              onClick={startRecording}
              // classToAdd="bg-green-500 hover:bg-green-400 "
              classToAdd="bg-button-gd hover:bg-button-gl "
            >
              <MicrophoneIcon className="h-8 w-8" />
            </RecordButton>
            <h4 className="text-zinc-700 text-lg">{t("startRecording")}</h4>
          </>
        ) : null}
        {recordingStatus === "recording" ? (
          <>
            <RecordButton
              onClick={stopRecording}
              classToAdd="relative flex bg-rose-500 hover:bg-rose-600"
            >
              <span className="animate-beat-one absolute inline-flex h-full w-full rounded-full bg-rose-500"></span>
              <span className="animate-beat-two absolute inline-flex h-full w-full rounded-full bg-rose-500"></span>
              <StopIcon className="h-8 w-8 absolute inline-flex" />
            </RecordButton>
            <h4 className="text-zinc-700 text-lg">
              {t("recordingInProgress")}
            </h4>
          </>
        ) : null}

        {/* Part2: playble audio */}
        {/* {audio ? (
          <div className="audio-container">
           <audio src={audio} controls></audio> 
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};
export default AudioRecorder;

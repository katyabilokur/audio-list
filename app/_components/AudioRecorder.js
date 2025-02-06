"use client";
import { useState, useRef } from "react";
import RecordButton from "./RecordButton";
import {
  LockClosedIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import {
  insertNewItems,
  structureText,
  transcribeAudio,
  uploadFileToStorage,
} from "../_lib/helpers";
import SpinnerWithText from "./SpinnerWithText";

const mimeType = "audio/webm";

const AudioRecorder = ({ userId }) => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  //audio recording processing
  const [processingStatus, setProcessingStatus] = useState(false);
  const [processingType, setProcessingType] = useState("");

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
    setProcessingType("Creating an audio record...");
    setRecordingStatus("inactive");

    //Stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //1. Create a blob file from the audio chunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      //2. Save recording file to the storage
      setProcessingType("Saving audio record...");
      const url = await uploadFileToStorage(audioBlob, userId);
      if (url.publicUrl) {
        //If file is created and saved begging data processing
        //3. Transcribe audio to text with Assembly AI
        setProcessingType("Transcribing audio to text...");
        const recordedText = await transcribeAudio(url.publicUrl);
        //TEST DATA
        // const recordedText = "a kid's book, some liquid to wash the floor";

        //4. Text structuring with Anthropic AI. Returns text in csv limited format
        setProcessingType("Structuring your recorder data...");
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
        setProcessingType("Saving shopping lists...");
        const insertedItems = await insertNewItems(csvText, userId);
        setProcessingStatus(false);
      }

      //Part1: creates a playable URL from the blob file. Can be downloaded or played if needed. So far removed
      // const audioUrl = URL.createObjectURL(audioBlob);
      // setAudio(audioUrl);

      //6. Clear audioChunks
      setAudioChunks([]);
    };
  };

  return (
    <div>
      {processingStatus && <SpinnerWithText text={processingType} />}
      <div className="audio-controls h-100 w-100">
        {!permission ? (
          <>
            <h4>Please get permissions to use your microphone</h4>
            <RecordButton
              onClick={getMicrophonePermission}
              classToAdd="bg-amber-500 hover:bg-amber-400"
            >
              <LockClosedIcon className="h-8 w-8" />
            </RecordButton>
          </>
        ) : null}
        {permission && recordingStatus === "inactive" ? (
          <>
            <h4>Start recording your shopping list</h4>
            <RecordButton
              onClick={startRecording}
              classToAdd="bg-green-500 hover:bg-green-400 "
            >
              <MicrophoneIcon className="h-8 w-8" />
            </RecordButton>
          </>
        ) : null}
        {recordingStatus === "recording" ? (
          <>
            <h4>Recording in progress</h4>

            <RecordButton
              onClick={stopRecording}
              classToAdd="relative flex bg-rose-500 hover:bg-rose-600"
            >
              <span className="animate-beat-one absolute inline-flex h-full w-full rounded-full bg-rose-500"></span>
              <span className="animate-beat-two absolute inline-flex h-full w-full rounded-full bg-rose-500"></span>
              <StopIcon className="h-8 w-8 absolute inline-flex" />
            </RecordButton>
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

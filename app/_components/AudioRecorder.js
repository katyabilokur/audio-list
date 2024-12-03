"use client";
import { useState, useRef } from "react";
import RecordButton from "./RecordButton";
import {
  LockClosedIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import { uploadFileToStorage } from "../_lib/helpers";

const mimeType = "audio/webm";

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

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
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      const publicUrl = await uploadFileToStorage(audioBlob);
      console.log(publicUrl);

      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  return (
    <div>
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

        {audio ? (
          <div className="audio-container">
            {/* <audio src={audio} controls></audio> */}
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default AudioRecorder;

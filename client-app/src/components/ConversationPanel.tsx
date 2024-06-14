import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import PushToTalkButton from "./PushToTalkButton";
import RevertButton from "./RevertButton";
import "./ConversationContainer.css";
import { FaMicrophone } from "react-icons/fa";

interface ConversationPanelProps {
    fields: any[];
    onRecordingChanged: (recording) => void
}

export default function ConversationPanel({ fields, onRecordingChanged }: ConversationPanelProps) {
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [response, setResponse] = useState();
  const [oldData, setOldData] = useState(undefined);

  const [formData, setFormData] = useState(
    fields.reduce((prev, curr) => ({ ...prev, [curr.name]: "" }), {})
  );

  const revert = () => {
    setFormData(oldData);
    setResponse(oldData);
    setOldData(undefined);
  };

  const onIsRecordingChanged = (recording: boolean) => {
    setIsRecording(recording);
    onRecordingChanged(recording);
  }

  useEffect(() => {
    if (isRecording) {
      document.body.classList.add("recording");
    } else {
      document.body.classList.remove("recording");
    }
  }, [isRecording]);

  const handleAudioUpload = (audioBlob) => {
    const formDataToSend = new FormData();
    formDataToSend.append("audio", audioBlob);
    const fieldsNoLabel = fields.map((field) => ({
      name: field.name,
      type: field.type,
    }));
    const formPayload = {
      formData,
      fields: fieldsNoLabel,
    };
    const serializedFormData = JSON.stringify(formPayload);
    formDataToSend.append("formData", serializedFormData);

    fetch("/api/upload", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("UUID:", data.uuid);
        setTranscription(data.transcription);
        setResponse(data.response);
        setOldData(formData);
        setFormData(data.response);
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
  };

  return (
    <div className={`conversation-container`}>
      <div className={`recording-indicator ${isRecording ? "recording" : ""} flex flex-col items-center justify-center`}>
          <div className="recording-circle">
            <FaMicrophone />
          </div>
          <div>Grabando...</div>
      </div>
      <div className="filler"></div>
      <div className="buttons-panel">
        <div className="conversation">
          {transcription && (
            <div className="chat-bubble user-bubble">You: {transcription}</div>
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <RevertButton onRevert={revert} canRevert={oldData != null} />
          <PushToTalkButton
            setAudioUrl={setAudioUrl}
            handleAudioUpload={handleAudioUpload}
            onIsRecordingChanged={onIsRecordingChanged}
          />
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  );
}

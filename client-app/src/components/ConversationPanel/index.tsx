import React, { useEffect, useState } from "react";
import AudioPlayer from "../AudioPlayer";
import PushToTalkButton from "../PushToTalkButton";
import RevertButton from "../RevertButton";
import "./styles.css";
import { FaCog, FaMicrophone } from "react-icons/fa";
import { FormGroup } from "../../form/api";

interface ConversationPanelProps {
  formGroup: FormGroup;
  formData: any;
  handleVoiceInputUpdate?: (data: any) => void;
  onIsRecordingChanged?: (recording) => void;
}

export default function ConversationPanel({
  formGroup,
  onIsRecordingChanged,
  formData,
  handleVoiceInputUpdate,
}: ConversationPanelProps) {
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState();
  const [oldData, setOldData] = useState(undefined);

  const handleVoiceInputResponse = (newData) => {
    setOldData(formData);
    if (handleVoiceInputUpdate) handleVoiceInputUpdate(newData);
  };

  const revert = () => {
    if (handleVoiceInputUpdate) handleVoiceInputUpdate(oldData);
    setResponse(oldData);
    setOldData(undefined);
  };

  const onRecordingChanged = (recording: boolean) => {
    setIsRecording(recording);
    if (onIsRecordingChanged) onIsRecordingChanged(recording);
  };

  useEffect(() => {
    if (isRecording) {
      document.body.classList.add("recording");
    } else {
      document.body.classList.remove("recording");
    }
  }, [isRecording]);

  const fields = formGroup.fields;

  const handleAudioUpload = (audioBlob) => {
    const formDataToSend = new FormData();
    formDataToSend.append("audio", audioBlob);
    const fieldsNoLabel = fields.map((field) => ({
      name: field.name,
      type: field.type,
      description: field.label,
    }));
    const formPayload = {
      formData,
      fields: fieldsNoLabel,
    };
    const serializedFormData = JSON.stringify(formPayload);
    formDataToSend.append("formData", serializedFormData);

    const upload = async () => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      setTranscription(data.transcription);
      setResponse(data.response);
      handleVoiceInputResponse(data.response);
    };

    setIsProcessing(true);
    upload()
      .catch((error) => {
        console.error("Error uploading audio:", error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <>
      <div
        className={`recording-indicator ${
          isRecording || isProcessing ? "recording" : ""
        } flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center">
          {isRecording && (
            <div className="recording-circle">
              <FaMicrophone />
            </div>
          )}
          {isProcessing && <FaCog className="text-5xl animate-spin" />}
          <div>
            {isProcessing ? "Procesando" : isRecording ? "Grabando" : ""}
          </div>
        </div>
      </div>
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
            onIsRecordingChanged={onRecordingChanged}
          />
          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </>
  );
}

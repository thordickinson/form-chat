import { useState, useEffect } from "react";
import "./App.css";
import PushToTalkButton from "./components/PushToTalkButton";
import AudioPlayer from "./components/AudioPlayer";
import DynamicForm from "./components/DynamicForm";

const App = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [response, setResponse] = useState("");

  const fields = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
      description: "Name of the person",
    },
    {
      label: "Edad",
      name: "age",
      type: "number",
      description: "How old is the person?",
    },
    {
      label: "Historia Clínicia",
      name: "bio",
      type: "textarea",
      description: "All health related events",
    },
    // Add more fields as needed
  ];

  const [formData, setFormData] = useState(
    fields.reduce((prev, curr) => ({ ...prev, [curr.name]: "" }), {})
  );

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("Form Data:", data);
  };

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
        setFormData(data.response);
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
  };

  useEffect(() => {
    if (isRecording) {
      document.body.classList.add("recording");
    } else {
      document.body.classList.remove("recording");
    }
  }, [isRecording]);

  return (
    <>
      <div
        className={`App ${isRecording ? "recording" : ""} w-full h-full p-4`}
      >
        <h1>Historia Clinica</h1>
        <DynamicForm
          fields={fields}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
          response={response}
        />
        <div className="conversation-container w-full p-8">
          <div className="conversation">
            {transcription && (
              <div className="chat-bubble user-bubble">You: {transcription}</div>
            )}
            {response && (
              <div className="chat-bubble ai-bubble">AI: {JSON.stringify(response)}</div>
            )}
          </div>
          <AudioPlayer audioUrl={audioUrl} />
          <PushToTalkButton
            setAudioUrl={setAudioUrl}
            handleAudioUpload={handleAudioUpload}
            onIsRecordingChanged={setIsRecording}
          />
        </div>
      </div>
    </>
  );
};

export default App;

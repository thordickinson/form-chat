import { useState, useEffect } from "react";
import "./App.css";
import PushToTalkButton from "./components/PushToTalkButton";
import AudioPlayer from "./components/AudioPlayer";
import DynamicForm from "./components/DynamicForm";
import { preguntasMedicas } from "./Survey";
import RevertButton from "./components/RevertButton";

const App = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [response, setResponse] = useState("");
  const [oldData, setOldData] = useState(undefined);

  const basic = [
    {
      label: "Nombre",
      name: "name",
      type: "text",
      description: "Nombre de la persona",
    },
    {
      label: "Edad",
      name: "age",
      type: "number",
      description: "¿Cuál es la edad de la persona?",
    },
    {
      label: "Casado",
      name: "married",
      type: "boolean",
      description: "Está casado el paciente",
    },
    {
      label: "Historia Clínicia",
      name: "bio",
      type: "textarea",
      description: "Eventos médicos del paciente",
    },
    // Add more fields as needed
  ];

  const fields = preguntasMedicas

  const [formData, setFormData] = useState(
    fields.reduce((prev, curr) => ({ ...prev, [curr.name]: "" }), {})
  );

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const revert = () => {
    setFormData(oldData);
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
        setOldData(formData);
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
        className={`${isRecording ? "recording" : ""} w-full App`}
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
          <div className="flex flex-row items-center justify-center gap-3">
            <RevertButton onRevert={revert} canRevert={oldData} />
            <PushToTalkButton
              setAudioUrl={setAudioUrl}
              handleAudioUpload={handleAudioUpload}
              onIsRecordingChanged={setIsRecording}
            />
            <AudioPlayer audioUrl={audioUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

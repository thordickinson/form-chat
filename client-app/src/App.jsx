import { useState } from "react";
import "./App.css";
import DynamicForm from "./components/DynamicForm";
import { preguntasMedicas } from "./Survey";
import ConversationPanel from "./components/ConversationPanel";

const App = () => {
  const fields = preguntasMedicas;
  const [formData, setFormData] = useState({});
  const [recording, setRecording] = useState(false);

  const handleFormChange = (data) => {
    // setFormData(data);
  };

  const handleFormSubmit = (data) => {
    // setFormData(data);
    console.log("Form Data:", data);
  };

  return (
    <div className={` w-full App flex flex-row ${recording ? "recording" : ""}`}>
      <ConversationPanel fields={fields} onRecordingChanged={setRecording} />
      <div className="w-full">
        <DynamicForm
          fields={fields}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        />
      </div>
    </div>
  );
};

export default App;

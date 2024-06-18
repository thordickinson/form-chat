import React, { useMemo, useState } from "react";
import "./App.css";
import DynamicForm from "./components/DynamicForm";
import { FormularioConsulta } from "./Survey";
import ConversationPanel from "./components/ConversationPanel";
import DynamicMultistepForm from "./components/DynamicMultistepForm";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Form, FormGroup, getDefaultData } from "./form/api";


function isVoiceInputCompatible(voiceInput: any, formGroup: FormGroup) {
  if(!voiceInput || Object.keys(voiceInput).length === 0) return false;
  for(const field of formGroup.fields) {
      if(voiceInput[field.name] == null) return false;
  }
  return true;
}

const App = () => {
  const form = FormularioConsulta;
  const [formData, setFormData] = useState(getDefaultData(form));
  const [recording, setRecording] = useState(false);

  const [formGroupIndex, setFormGroupIndex] = useState(0);
  const formGroup = useMemo(() => form.groups[formGroupIndex], [formGroupIndex]);
  const currentData = useMemo(() => formData[formGroupIndex], [formData, formGroupIndex]);

  const handleFormChange = (data: any, idx: number) => {
    const newState = [...formData];
    newState[idx] = data;
    setFormData(newState);
  };


  const onVoiceTextInput = (data: any) => {
    const compatible = isVoiceInputCompatible(data, formGroup);
    if(!compatible){
      console.warn("Voice input is not compatible with the current form");
      return;
    }
    const newData = [...formData]
    newData[formGroupIndex] = data;
    setFormData(newData);
  };

  return (
    <PrimeReactProvider value={{ unstyled: false }}>
      <div
        className={` w-full min-h-screen App flex flex-row ${
          recording ? "recording" : ""
        }`}
      >
        <ConversationPanel
          formGroup={formGroup}
          onIsRecordingChanged={setRecording}
          formData={currentData}
          handleVoiceInputUpdate={onVoiceTextInput}
        />
        <div className="w-full p-2 md:p-4">
          <DynamicMultistepForm
            formData={formData}
            form={FormularioConsulta}
            onFormGroupChanged={setFormGroupIndex}
            onFormDataChanged={handleFormChange}
          />
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;

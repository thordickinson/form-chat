import { useState } from 'react';
import './App.css';
import PushToTalkButton from './components/PushToTalkButton';
import AudioPlayer from './components/AudioPlayer';
import DynamicForm from './components/DynamicForm';

const App = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');

  const fields = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Age', name: 'age', type: 'number' },
    { label: 'Bio', name: 'bio', type: 'textarea' },
    // Add more fields as needed
  ];

  const [formData, setFormData] = useState({});

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log('Form Data:', data);
  };

  const handleAudioUpload = (audioBlob) => {
    const formDataToSend = new FormData();
    formDataToSend.append('audio', audioBlob);
    const serializedFormData = JSON.stringify(formData);
    formDataToSend.append('formData', serializedFormData);

    fetch('/api/upload', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        console.log('UUID:', data.uuid);
        setTranscription(data.transcription);
        setResponse(data.response);
      })
      .catch(error => {
        console.error('Error uploading audio:', error);
      });
  };

  return (
    <>
    <div className="App">
      <h1>Dynamic Form</h1>
      <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
    </div>
    <div className="app-container">
      <PushToTalkButton setAudioUrl={setAudioUrl} handleAudioUpload={handleAudioUpload} />
      <AudioPlayer audioUrl={audioUrl} />
      <div className="conversation">
        {transcription && <div className="transcription">You: {transcription}</div>}
        {response && <div className="response">AI: {response}</div>}
      </div>
    </div>
    </>
  );
};

export default App;

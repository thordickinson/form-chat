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

  const handleSubmit = (formData) => {
    console.log('Form Data:', formData);
  };

  return (
    <div className="App">
      <h1>Dynamic Form</h1>
      <DynamicForm fields={fields} onSubmit={handleSubmit} />
    </div>
    <div className="app-container">
      <PushToTalkButton setAudioUrl={setAudioUrl} setTranscription={setTranscription} setResponse={setResponse} />
      <AudioPlayer audioUrl={audioUrl} />
      <div className="conversation">
        {transcription && <div className="transcription">You: {transcription}</div>}
        {response && <div className="response">AI: {response}</div>}
      </div>
    </div>
  );
};

export default App;

import { useState } from 'react';
import './App.css';
import PushToTalkButton from './components/PushToTalkButton';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [audioUrl, setAudioUrl] = useState('');
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');

  return (
    <div className="app-container">
      <PushToTalkButton setAudioUrl={setAudioUrl} setTranscription={setTranscription} setResponse={setResponse} />
      <AudioPlayer audioUrl={audioUrl} />
      <div className="conversation">
        {transcription && <div className="transcription">You: {transcription}</div>}
        {response && <div className="response">AI: {response}</div>}
      </div>
    </div>
  );
}

export default App;

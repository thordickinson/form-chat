import { useState } from 'react';
import './App.css';
import PushToTalkButton from './components/PushToTalkButton';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [audioUrl, setAudioUrl] = useState('');

  return (
    <div className="app-container">
      <PushToTalkButton setAudioUrl={setAudioUrl} />
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
}

export default App;

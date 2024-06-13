import { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const PushToTalkButton = ({ setAudioUrl, handleAudioUpload, onIsRecordingChanged }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleMouseDown = async () => {
    setIsRecording(true);
    onIsRecordingChanged(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const handleMouseUp = () => {
    setIsRecording(false);
    onIsRecordingChanged(false);
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      handleAudioUpload(audioBlob);
      audioChunksRef.current = [];
    };
  };

  return (<div className='ptt-button-container'>
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={`push-to-talk-button ${isRecording ? 'recording' : ''}`}
    >
      <FaMicrophone />
    </button>
    </div>
  );
};

export default PushToTalkButton;

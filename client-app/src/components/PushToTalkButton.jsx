import { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const PushToTalkButton = ({ setAudioUrl, setTranscription, setResponse, formData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleMouseDown = async () => {
    setIsRecording(true);
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
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
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
          setAudioUrl(audioUrl);
          setTranscription(data.transcription);
          setResponse(data.response);
        })
        .catch(error => {
          console.error('Error uploading audio:', error);
        });
      audioChunksRef.current = [];
    };
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`push-to-talk-button ${isRecording ? 'recording' : ''}`}
    >
      <FaMicrophone />
    </button>
  );
};

export default PushToTalkButton;

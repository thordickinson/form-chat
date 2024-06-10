import { useState, useRef } from 'react';

const PushToTalkButton = ({ setAudioUrl }) => {
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
      const formData = new FormData();
      formData.append('audio', audioBlob);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('UUID:', data.uuid);
          setAudioUrl(audioUrl);
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
      className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-green-500'}`}
    >
      {isRecording ? 'Recording...' : 'Push to Talk'}
    </button>
  );
};

export default PushToTalkButton;

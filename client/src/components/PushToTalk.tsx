import React, { useState, useEffect } from 'react';

const PushToTalk: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    if (isRecording) {
      // Start recording
      console.log('Recording started');
    } else {
      // Stop recording
      console.log('Recording stopped');
    }
  }, [isRecording]);

  const handleMouseDown = () => {
    setIsRecording(true);
  };

  const handleMouseUp = () => {
    setIsRecording(false);
  };

  return (
    <div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        Push to Talk
      </button>
    </div>
  );
};

export default PushToTalk;

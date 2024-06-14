import React from 'react';

const ConversationContainer = ({ children, isRecording }) => {
  return (
    <div className={`conversation-container ${isRecording ? 'recording' : ''}`}>
      {children}
    </div>
  );
};

export default ConversationContainer;

import React from 'react';
import PushToTalk from './components/PushToTalk';

const App: React.FC = () => {
  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold">Hello, React!</h1>
      <PushToTalk />
    </div>
  );
}

export default App;

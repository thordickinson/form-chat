const AudioPlayer = ({ audioUrl }) => {
  return (
    <div className="w-full flex-row">
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;

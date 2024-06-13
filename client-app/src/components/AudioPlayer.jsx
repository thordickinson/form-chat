import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => setIsPlaying(false);

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="audio-player-container">
      {audioUrl && (
        <>
          <audio ref={audioRef}>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <button className="alt-button audio-player-button" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </>
      )}
      { !audioUrl && 
        <button className="alt-button audio-player-button disabled">
             <FaPlay />
          </button>
      }
    </div>
  );
};

export default AudioPlayer;

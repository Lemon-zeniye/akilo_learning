import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconArrowsMaximize,
} from "@tabler/icons-react";

interface VideoPlayerProps {
  videoUrl: string;
  onNext: () => void;
  onPrevious: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onNext,
  onPrevious,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100); // Convert to percentage
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value) / 100;
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo);
    }
  };

  const handleFullScreen = () => {
    if (playerRef.current) {
      const playerElement =
        playerRef.current.getInternalPlayer() as HTMLVideoElement;
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-black text-white px-4 py-4 rounded-md shadow-lg w-full">
      <div className="relative w-full bg-gray-800 h-[65vh] rounded-md overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          volume={volume}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
        />
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center text-white text-8xl"
        >
          {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
        </button>
      </div>

      <div className="w-full mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeekChange}
          className="w-full appearance-none bg-gray-600 h-2 rounded-md"
          style={{
            accentColor: "#FFD700",
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-4 space-x-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-xl"
          >
            <IconPlayerSkipBack className="text-yellow-500" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 text-3xl"
          >
            {isPlaying ? (
              <IconPlayerPause className="text-yellow-500" />
            ) : (
              <IconPlayerPlay className="text-yellow-500" />
            )}
          </button>
          <button
            onClick={onNext}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-xl"
          >
            <IconPlayerSkipForward className="text-yellow-500" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 appearance-none bg-gray-600 h-2 rounded-md"
            style={{
              accentColor: "#FFD700",
            }}
          />
          <button
            onClick={handleFullScreen}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
          >
            <IconArrowsMaximize className="text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

import React, { useEffect, useRef, useState } from "react";
import { getMusicMediaById, MusicMedia } from "../../service/MusicMedia/MusicMediaCache";
import "./MusicPlayerBar.css";
import logo from "./logo.png";
import { Link, useHistory } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayerBar = (props: any) => {
  const [musicMedia, setMusicMedia] = useState<MusicMedia>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setMusicMedia(getMusicMediaById(props.songId));
    setIsPlaying(false); // Pause the current song when it changes
  }, [props.songId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getMusicMediaById(props.songId)?.song;

      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [props.songId, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current ? audioRef.current.duration : 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(audioRef.current.currentTime);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="playerBar">
      <img className="img" alt={`cover`} src={getMusicMediaById(props.songId)?.image} />
      <div className="controller">
        <div className="playButton" onClick={togglePlay}>
          {!isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="sliderContainer">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            step={1}
            className="slider"
            onChange={handleSliderChange}
          />
        </div>
        <div className="timeContainer">
          <span className="currentTime">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
        <audio
          ref={audioRef}
          className="whiteAudio"
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleDurationChange}
          onEnded={() => setIsPlaying(false)} // Pause the song when it ends
        />
      </div>
    </div>
  );
};

export default MusicPlayerBar;

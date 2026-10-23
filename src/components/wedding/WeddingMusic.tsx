
"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";

export default function WeddingMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setPlaying(true);
      setAudioError(false);
    };

    const handlePause = () => setPlaying(false);

    const handleError = () => {
      setPlaying(false);
      setAudioError(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setAudioError(false);
      await audio.play();
    } catch (error) {
      console.error("Wedding music playback failed:", error);
      setPlaying(false);
      setAudioError(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding-music.mp3"
        loop
        preload="auto"
      />

      <div className="wedding-music-container">
        <button
          type="button"
          className={`wedding-music-button ${
            playing ? "is-playing" : ""
          }`}
          onClick={toggleMusic}
          aria-label={playing ? "Pause wedding music" : "Play wedding music"}
          aria-pressed={playing}
          title={playing ? "Pause music" : "Play wedding music"}
        >
          <span className="wedding-music-icon">
            {playing ? (
              <Pause size={17} strokeWidth={1.7} />
            ) : (
              <Music2 size={18} strokeWidth={1.7} />
            )}
          </span>

          <span className="wedding-music-divider" />

          <span className="wedding-music-text">
            <span className="wedding-music-eyebrow">
              {playing ? "NOW PLAYING" : "A LITTLE ROMANCE"}
            </span>

            <span className="wedding-music-label">
              {playing ? "Pause music" : "Wedding music"}
            </span>
          </span>

          <span className="wedding-music-indicator" aria-hidden="true">
            {playing ? (
              <>
                <i />
                <i />
                <i />
                <i />
              </>
            ) : (
              <span className="wedding-music-dot" />
            )}
          </span>
        </button>

        {audioError && (
          <p className="wedding-music-error" role="status">
            Music load nahi hui. Please check karein ki
            public/music/wedding-music.mp3 file available hai.
          </p>
        )}
      </div>
    </>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";

export default function WeddingMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [audioError, setAudioError] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setPlaying(true);
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

        if (playing) {
            audio.pause();
            return;
        }

        try {
            setAudioError(false);
            await audio.play();
        } catch {
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

            <button
                type="button"
                className={`wedding-music-button ${playing ? "is-playing" : ""
                    }`}
                onClick={toggleMusic}
                aria-label={playing ? "Pause wedding music" : "Play wedding music"}
                title={
                    audioError
                        ? "Audio unavailable — check the music file"
                        : playing
                            ? "Pause music"
                            : "Play wedding music"
                }
            >
                {playing ? (
                    <Pause size={19} strokeWidth={1.8} />
                ) : (
                    <Music2 size={20} strokeWidth={1.8} />
                )}

                <span className="wedding-music-label">
                    {playing ? "PAUSE MUSIC" : "WEDDING MUSIC"}
                </span>
            </button>

            {audioError && (
                <p className="wedding-music-error" role="status">
                    Music load nahi hui. Check karein ki public/music/wedding-music.mp3
                    file maujood hai.
                </p>
            )}

            
        </>

    );

    
}

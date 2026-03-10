import { useEffect, useMemo, useRef, useState } from "react";
import type { Song } from "../pages/Music";

type MusicPlayerProps = {
  song: Song;
};

export default function MusicPlayer({ song }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<"audio" | "video">("audio");
  const [shuffle, setShuffle] = useState(false);

  const loggedIn = false;
  const previewLimitMs = 30000;

  const source = useMemo(() => {
    if (mode === "video") return song.video;
    return loggedIn ? song.full : song.preview;
  }, [loggedIn, mode, song.full, song.preview, song.video]);

  useEffect(() => {
    setIsPlaying(false);
    setMode("audio");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [song]);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (!loggedIn && isPlaying) {
      timeoutId = window.setTimeout(() => {
        audioRef.current?.pause();
        videoRef.current?.pause();
        setIsPlaying(false);
        alert("Please log in to listen to the full version.");
      }, previewLimitMs);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isPlaying, loggedIn, song, mode]);

  const playCurrentMedia = async () => {
    try {
      if (mode === "audio") {
        await audioRef.current?.play();
      } else {
        await videoRef.current?.play();
      }
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const pauseCurrentMedia = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pauseCurrentMedia();
      return;
    }

    if (mode === "audio" && !audioRef.current) return;
    if (mode === "video" && !videoRef.current) return;

    await playCurrentMedia();
  };

  const handleModeChange = async (nextMode: "audio" | "video") => {
    if (nextMode === mode) return;

    pauseCurrentMedia();
    setMode(nextMode);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${song.title} — ${song.artist}`,
      text: "Check out this track on EyeZo",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 text-white backdrop-blur transition-all duration-300 ${
        isExpanded ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="shrink-0"
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-14 h-14 rounded-xl object-cover"
            />
          </button>

          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{song.title}</p>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            {!loggedIn && (
              <p className="text-xs text-amber-400 mt-1">Preview only. Log in for full playback.</p>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 p-1">
            <button
              type="button"
              onClick={() => handleModeChange("audio")}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                mode === "audio" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Audio
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("video")}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                mode === "video" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Video
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShuffle((prev) => !prev)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                shuffle ? "bg-blue-600 text-white" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle shuffle"
            >
              🔀
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full bg-white text-black px-4 py-2 font-medium hover:bg-gray-200 transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="rounded-full bg-white/10 px-3 py-2 hover:bg-white/20 transition"
              aria-label="Share song"
            >
              Share
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[420px] pb-5" : "max-h-0"
          }`}
        >
          <div className="border-t border-white/10 pt-4 grid gap-4">
            <div className="sm:hidden flex items-center gap-2 rounded-full bg-white/5 p-1 w-fit">
              <button
                type="button"
                onClick={() => handleModeChange("audio")}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  mode === "audio" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Audio
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("video")}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  mode === "video" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Video
              </button>
            </div>

            {mode === "audio" ? (
              <div className="rounded-2xl bg-neutral-950 border border-white/10 p-4">
                <audio
                  ref={audioRef}
                  src={source}
                  controls
                  className="w-full"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
                <video
                  ref={videoRef}
                  src={source}
                  controls
                  className="w-full max-h-[360px] bg-black"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
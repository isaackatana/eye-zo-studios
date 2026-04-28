import { useEffect, useRef, useState } from "react";
import { songs, type Song } from "../data/songs";

type MediaMode = "audio" | "video";

export default function SlidePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaMode, setMediaMode] = useState<MediaMode>("audio");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoggedIn] = useState(false);

  const previewLimit = 30;

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    if (isPlaying && mediaMode === "audio") {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong, mediaMode, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play().then(() => setIsPlaying(true));
  };

  const playNext = () => {
    if (isShuffle) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(randomSong);
      setIsPlaying(true);
      return;
    }

    const index = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(index + 1) % songs.length];

    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong = songs[(index - 1 + songs.length) % songs.length];

    setCurrentSong(previousSong);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || isLoggedIn) return;

    if (audioRef.current.currentTime >= previewLimit) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      alert("Preview ended. Please log in to unlock full playback.");
    }
  };

  const shareSong = async () => {
    const shareText = `Listen to ${currentSong.title} by ${currentSong.artist}`;

    if (navigator.share) {
      await navigator.share({
        title: currentSong.title,
        text: shareText,
        url: window.location.href,
      });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    alert("Song link copied.");
  };

  return (
    <section
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-[72%]"
      }`}
    >
      <button
        onClick={() => setIsOpen((value) => !value)}
        className="mx-auto block rounded-t-full bg-brand-gold px-6 py-1 text-xs font-bold text-black"
      >
        {isOpen ? "Hide Player" : "Open Player"}
      </button>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">
              Now Playing
            </p>
            <h3 className="mt-1 text-xl font-bold">{currentSong.title}</h3>
            <p className="text-sm text-white/60">{currentSong.artist}</p>
            <p className="mt-1 text-xs text-white/40">{currentSong.type}</p>
          </div>

          <div>
            {mediaMode === "video" ? (
              <video
                src={currentSong.videoUrl}
                controls
                className="max-h-52 w-full rounded-2xl border border-white/10 bg-black object-cover"
              />
            ) : (
              <>
                <audio
                  ref={audioRef}
                  src={currentSong.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={playNext}
                />

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 rounded-full bg-brand-gold" />
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={playPrevious}
                      className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
                    >
                      Prev
                    </button>

                    <button
                      onClick={togglePlay}
                      className="rounded-full bg-brand-gold px-7 py-3 font-bold text-black hover:opacity-90"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>

                    <button
                      onClick={playNext}
                      className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
            <button
              onClick={() =>
                setMediaMode((mode) => (mode === "audio" ? "video" : "audio"))
              }
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              {mediaMode === "audio" ? "Video Mode" : "Audio Mode"}
            </button>

            <button
              onClick={() => setIsShuffle((value) => !value)}
              className={`rounded-full px-4 py-2 text-sm ${
                isShuffle
                  ? "bg-brand-gold text-black"
                  : "border border-white/20 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              Shuffle
            </button>

            <button
              onClick={shareSong}
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              Share
            </button>
          </div>
        </div>

        {!isLoggedIn && (
          <p className="mt-4 text-xs text-white/50">
            Preview mode: guests can listen for {previewLimit} seconds. Log in
            to unlock full playback.
          </p>
        )}
      </div>
    </section>
  );
}
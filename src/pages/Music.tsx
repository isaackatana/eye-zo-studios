import { useEffect, useRef, useState } from "react";

type Song = {
  id: number;
  title: string;
  artist: string;
  type: string;
  audioUrl: string;
  videoUrl: string;
  coverUrl?: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Midnight Echo",
    artist: "Eye Zo",
    type: "Afro Fusion",
    audioUrl: "/audio/midnight-echo.mp3",
    videoUrl: "/videos/midnight-echo.mp4",
  },
  {
    id: 2,
    title: "Coastline Dreams",
    artist: "Eye Zo",
    type: "Ambient",
    audioUrl: "/audio/coastline-dreams.mp3",
    videoUrl: "/videos/coastline-dreams.mp4",
  },
  {
    id: 3,
    title: "Fire in Motion",
    artist: "Eye Zo",
    type: "Visual EP",
    audioUrl: "/audio/fire-in-motion.mp3",
    videoUrl: "/videos/fire-in-motion.mp4",
  },
];

export default function Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const previewLimit = 30;

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    if (isPlaying && mediaMode === "audio") {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentSong, mediaMode, isPlaying]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setMediaMode("audio");
    setIsPlaying(true);
    setIsOpen(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || isLoggedIn) return;

    if (audioRef.current.currentTime >= previewLimit) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      alert("Preview ended. Please log in to play the full song.");
    }
  };

  const playNext = () => {
    if (isShuffle) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(randomSong);
      setIsPlaying(true);
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];

    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];

    setCurrentSong(previousSong);
    setIsPlaying(true);
  };

  const shareSong = async () => {
    const shareData = {
      title: currentSong.title,
      text: `Listen to ${currentSong.title} by ${currentSong.artist}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    alert("Song link copied.");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-72 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
          Music
        </p>

        <h1 className="text-4xl font-bold">Latest releases</h1>

        <p className="mt-3 max-w-2xl text-white/60">
          Stream previews, switch between audio and video, shuffle releases, and
          share your favorite Eye Zo tracks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {songs.map((song) => (
          <article
            key={song.id}
            onClick={() => playSong(song)}
            className={`cursor-pointer rounded-3xl border p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 ${
              currentSong.id === song.id
                ? "border-brand-gold bg-brand-gold/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="mb-4 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-brand-gold/30">
              <span className="text-5xl">♪</span>
            </div>

            <p className="text-sm uppercase tracking-widest text-brand-gold">
              {song.type}
            </p>

            <h2 className="mt-1 text-2xl font-bold">{song.title}</h2>
            <p className="text-white/70">{song.artist}</p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                playSong(song);
              }}
              className="mt-5 rounded-full bg-brand-gold px-5 py-2 font-semibold text-black transition hover:scale-105"
            >
              Preview
            </button>
          </article>
        ))}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-[72%]"
        }`}
      >
        <button
          onClick={() => setIsOpen((value) => !value)}
          className="mx-auto block rounded-t-full bg-brand-gold px-6 py-1 text-xs font-bold text-black"
        >
          {isOpen ? "Hide Player" : "Open Player"}
        </button>

        <div className="p-4">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-brand-gold">
                Now playing
              </p>
              <h3 className="text-xl font-bold">{currentSong.title}</h3>
              <p className="text-sm text-white/60">{currentSong.artist}</p>
              <p className="text-xs text-white/40">{currentSong.type}</p>
            </div>

            {mediaMode === "video" ? (
              <video
                className="max-h-40 rounded-2xl border border-white/10 bg-black"
                src={currentSong.videoUrl}
                controls
              />
            ) : (
              <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={playNext}
              />
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={playPrevious}
                className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Prev
              </button>

              <button
                onClick={togglePlay}
                disabled={mediaMode === "video"}
                className="rounded-full bg-brand-gold px-6 py-2 font-semibold text-black disabled:opacity-40"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={playNext}
                className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Next
              </button>

              <button
                onClick={() =>
                  setMediaMode((mode) => (mode === "audio" ? "video" : "audio"))
                }
                className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
              >
                {mediaMode === "audio" ? "Video" : "Audio"}
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
            <p className="mx-auto mt-3 max-w-7xl text-xs text-white/50">
              Preview mode: guests can listen for {previewLimit} seconds. Log in
              to unlock full playback.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
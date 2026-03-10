import { useState } from "react";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

export type Song = {
  id: number;
  title: string;
  artist: string;
  preview: string;
  full: string;
  video: string;
  cover: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Night Drive",
    artist: "EyeZo Studios",
    preview: "/audio/night-drive-preview.mp3",
    full: "/audio/night-drive.mp3",
    video: "/video/night-drive.mp4",
    cover: "/covers/night-drive.jpg",
  },
  {
    id: 2,
    title: "City Lights",
    artist: "EyeZo Studios",
    preview: "/audio/city-lights-preview.mp3",
    full: "/audio/city-lights.mp3",
    video: "/video/city-lights.mp4",
    cover: "/covers/city-lights.jpg",
  },
];

export default function Music() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Listen</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Music</h1>
        <p className="text-gray-400 mt-3 max-w-2xl">
          Explore featured tracks, switch between audio and video previews, and unlock full playback after login.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pb-32">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onPlay={setCurrentSong} />
        ))}
      </div>

      {currentSong && <MusicPlayer song={currentSong} />}
    </section>
  );
}
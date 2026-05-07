import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { songs, type Song } from "../data/songs";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favoriteSongIds, toggleFavorite } = useFavorites();

  const favoriteSongs = songs.filter((song) =>
    favoriteSongIds.includes(song.id)
  );

  const [currentSong, setCurrentSong] = useState<Song>(
    favoriteSongs[0] || songs[0]
  );

  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-80 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
          Your Library
        </p>

        <h1 className="text-4xl font-bold">Favorites</h1>

        <p className="mt-3 max-w-2xl text-white/60">
          Your saved tracks and favorite releases.
        </p>
      </div>

      {favoriteSongs.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-5xl">♡</p>

          <h2 className="mt-4 text-2xl font-bold">
            No favorite songs yet
          </h2>

          <p className="mt-2 text-white/60">
            Save songs from the music page to build your library.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favoriteSongs.map((song) => (
            <article
              key={song.id}
              onClick={() => playSong(song)}
              className={`cursor-pointer rounded-3xl border p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 ${
                currentSong.id === song.id
                  ? "border-brand-gold bg-brand-gold/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-brand-gold/30">
                {song.coverUrl ? (
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">♪</span>
                )}
              </div>

              <p className="text-sm uppercase tracking-widest text-brand-gold">
                {song.type}
              </p>

              <h2 className="mt-1 text-2xl font-bold">{song.title}</h2>

              <p className="text-white/70">{song.artist}</p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    playSong(song);
                  }}
                  className="rounded-full bg-brand-gold px-5 py-2 font-semibold text-black transition hover:scale-105"
                >
                  Play
                </button>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(song.id);
                  }}
                  className="rounded-full border border-brand-gold bg-brand-gold px-4 py-2 text-sm text-black transition hover:opacity-80"
                >
                  ♥ Saved
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <MusicPlayer
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </section>
  );
}
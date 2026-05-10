const platforms = [
  "Spotify",
  "Apple Music",
  "Audiomack",
  "Boomplay",
  "YouTube Music",
  "TikTok",
  "Deezer",
  "Amazon Music",
  "Tidal",
  "SoundCloud",
];

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
            Creative Studio • Music • Film • Culture
          </p>

          <h1 className="mb-3 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Stories in sound, vision, and style.
          </h1>

          <p className="mb-4 max-w-xl text-lg text-white/75">
            Eye Zo is a modern creative platform for music, film,
            documentaries, visual storytelling, and curated products.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/music"
              className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Explore Music
            </a>

            <a
              href="/film"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-brand-cream transition hover:bg-white/10"
            >
              Watch Films
            </a>

            <a
              href="/signup"
              className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-brand-gold"
            >
              Get Started
            </a>
          </div>

          {/* Crawling Platform Logos */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-5 backdrop-blur">
            <div className="flex animate-[scroll_25s_linear_infinite] gap-4 whitespace-nowrap px-4">
              {[...platforms, ...platforms].map((platform, index) => (
                <div
                  key={index}
                  className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm font-semibold text-white/80 shadow-lg"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-gold/20 via-white/10 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.15),transparent_55%)]" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-gold">
                Global Distribution
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                Reach every major streaming platform.
              </h3>

              <p className="mt-2 text-sm text-white/70">
                Upload music, grow your audience, and distribute your sound
                worldwide with Eye Zo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

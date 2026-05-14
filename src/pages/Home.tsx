import {
  Music2,
  Globe2,
  ShieldCheck,
  BarChart3,
  UploadCloud,
} from "lucide-react";

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

const features = [
  {
    icon: UploadCloud,
    title: "Instant Distribution",
    description:
      "Upload once and distribute your music worldwide from one dashboard.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Release music across all major streaming platforms worldwide.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track streams, audience growth, and platform performance.",
  },
  {
    icon: ShieldCheck,
    title: "Rights Protection",
    description:
      "Protect your releases and manage ownership securely.",
  },
];

export default function Home() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_40%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        {/* HERO */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT SIDE */}
          <div className="w-full min-w-0">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-gold sm:text-xs">
              <Music2 className="h-4 w-4 shrink-0" />
              <span className="truncate">
                White Label Music Distribution
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white xs:text-5xl sm:text-6xl lg:text-7xl xl:text-[82px]">
              Launch your music globally from your own platform.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
              Eye Zo helps artists, labels, and creators distribute music
              worldwide while maintaining full ownership and control.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="/signup"
                className="flex h-14 items-center justify-center rounded-full bg-brand-gold px-8 text-center text-sm font-bold text-black transition hover:scale-[1.02] sm:w-auto"
              >
                Start Distributing
              </a>

              <a
                href="/music"
                className="flex h-14 items-center justify-center rounded-full border border-white/15 px-8 text-center text-sm font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold sm:w-auto"
              >
                Explore Music
              </a>
            </div>

            {/* PLATFORM CRAWLER */}
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] py-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-gradient-to-r from-brand-black to-transparent" />

              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-brand-black to-transparent" />

              <div className="flex min-w-max animate-[scroll_28s_linear_infinite] gap-3 px-4">
                {[...platforms, ...platforms].map((platform, index) => (
                  <div
                    key={index}
                    className="flex shrink-0 items-center rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold text-white/80 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full min-w-0">
            <div className="mx-auto w-full max-w-[560px] rounded-[28px] border border-white/10 bg-white/[0.05] p-3 shadow-2xl backdrop-blur-2xl sm:p-5">
              <div className="rounded-[24px] border border-white/10 bg-black/50 p-4 sm:p-6">
                {/* TOP */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-white/50 sm:text-sm">
                      Monthly Streams
                    </p>

                    <h2 className="mt-1 truncate text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                      2.4M
                    </h2>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-brand-gold px-3 py-2 text-xs font-bold text-black sm:px-4 sm:py-3 sm:text-sm">
                    +18%
                  </div>
                </div>

                {/* CHART */}
                <div className="mb-6 flex h-36 items-end gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:h-44 sm:gap-3 sm:p-4 lg:h-52">
                  {[30, 50, 35, 70, 60, 90, 75, 110].map((bar, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-xl bg-brand-gold/80"
                      style={{
                        height: `${bar}px`,
                      }}
                    />
                  ))}
                </div>

                {/* RELEASE CARD */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold/70 to-white/10 text-xl font-black text-black sm:h-16 sm:w-16 sm:text-2xl">
                      ♪
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-white sm:text-base">
                        Midnight Echoes
                      </h3>

                      <p className="truncate text-xs text-white/50 sm:text-sm">
                        Distributed worldwide
                      </p>
                    </div>

                    <div className="shrink-0 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-1 text-[10px] font-semibold text-brand-gold sm:px-3 sm:text-xs">
                      LIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-brand-gold/20 hover:bg-white/[0.06] sm:p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold sm:h-14 sm:w-14">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
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

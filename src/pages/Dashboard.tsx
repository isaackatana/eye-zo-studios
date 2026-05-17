import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
          Creator Dashboard
        </p>

        <h1 className="text-4xl font-black">
          Welcome back
        </h1>

        <p className="mt-3 text-white/60">
          {user?.email}
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">
            Total Releases
          </p>

          <h2 className="mt-3 text-4xl font-black">
            12
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">
            Total Streams
          </p>

          <h2 className="mt-3 text-4xl font-black">
            24.8K
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">
            Favorites
          </p>

          <h2 className="mt-3 text-4xl font-black">
            182
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">
            Active Releases
          </p>

          <h2 className="mt-3 text-4xl font-black">
            8
          </h2>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/upload"
            className="rounded-full bg-brand-gold px-6 py-3 font-bold text-black"
          >
            Upload Release
          </a>

          <a
            href="/music"
            className="rounded-full border border-white/15 px-6 py-3"
          >
            View Music
          </a>

          <a
            href="/favorites"
            className="rounded-full border border-white/15 px-6 py-3"
          >
            Favorites
          </a>
        </div>
      </div>

      {/* RECENT RELEASES */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Recent Releases
        </h2>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
            >
              <div>
                <h3 className="font-bold">
                  Midnight Echoes
                </h3>

                <p className="text-sm text-white/50">
                  Released 3 days ago
                </p>
              </div>

              <div className="rounded-full bg-brand-gold/10 px-4 py-2 text-sm text-brand-gold">
                LIVE
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
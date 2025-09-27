import Image from "next/image"
import LazyVideo from "./lazy-video"

export function Hero() {

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div className="mb-5 flex items-center gap-2">
            <Image src="/icons/amigames.png" alt="AmiGames Logo" width={1080} height={1080} className="h-32 w-32" />
            <p className="text-center uppercase tracking-[0.25em] text-lime-300/80">AmiGames</p>
          </div>
          <h1 className="mt-3 text-center uppercase text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Bringing</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">MY Game's Story</span>
            <span className="block">to Life</span>
          </h1>

          <div className="mt-20 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {phoneData.map((p, i) => {
              const visibility = i <= 2 ? "block" : i === 3 ? "hidden md:block" : i === 4 ? "hidden xl:block" : "hidden"

              return (
                <div key={i} className={visibility}>
                  <PhoneCard title={p.title} sub={p.sub} tone={p.tone} gradient={p.gradient} videoSrc={p.videoSrc} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "8°",
  sub = "Clear night. Great for render farm runs.",
  tone = "calm",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  videoSrc,
}: {
  title?: string
  sub?: string
  tone?: string
  gradient?: string
  videoSrc?: string
}) {
  return (
    <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <LazyVideo
          src={
            videoSrc ??
            "./videos/miyabi.mp4"
          }
          className="absolute inset-0 h-full w-full object-cover"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />

        <div className="relative z-10 p-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="space-y-1 px-1">
            <div className="text-3xl font-bold leading-snug text-white/90">{title}</div>
            <p className="text-xs text-white/70">{sub}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300">
              {tone === "calm" ? "amigames" : tone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const phoneData = [
  {
    title: "Fast-Paced",
    sub: "Dive into a world of speed and strategy.",
    tone: "gameplay",
    gradient: "from-[#0b0b0b] via-[#0f172a] to-[#020617]",
    videoSrc:
      "./videos/miyabi.mp4",
  },
  {
    title: "Domination",
    sub: "Assert your dominance over the leaderboards.",
    tone: "battlefield",
    gradient: "from-[#0b0b0b] via-[#111827] to-[#052e16]",
    videoSrc:
      "./videos/miyabi.mp4",
  },
  {
    title: "Achievements",
    sub: "Unlock incredible in-game achievements.",
    tone: "rewards",
    gradient: "from-[#001028] via-[#0b355e] to-[#052e5e]",
    videoSrc:
      "./videos/miyabi.mp4",
  },
  {
    title: "Progression",
    sub: "Advance through ranks and become an elite player.",
    tone: "growth",
    gradient: "from-[#0b0b0b] via-[#1f2937] to-[#0b1220]",
    videoSrc:
      "./videos/miyabi.mp4",
  },
  {
    title: "Speed",
    sub: "Unleash your skills at breakneck speed.",
    tone: "speed",
    gradient: "from-[#0b1a0b] via-[#052e16] to-[#022c22]",
    videoSrc:
      "./videos/miyabi.mp4",
  },
]

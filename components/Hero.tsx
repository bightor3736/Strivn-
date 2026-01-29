import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "+42%", label: "Snellere pipeline" },
  { value: "95%", label: "Datadekking" },
  { value: "24/7", label: "Intent signals" }
];

export default function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1.1fr_0.9fr]">
      <ScrollReveal>
        <div>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
            B2B Growth Intelligence
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Vind en verrijk B2B leads in seconden.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-300">
            Strivn combineert bedrijfsdata, intent signals en verrijking om je
            sales team sneller de juiste prospects te laten targeten.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-bg-900 shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400">
              Plan een demo
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-text-100 transition hover:-translate-y-0.5 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400">
              Bekijk hoe het werkt
            </button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal className="flex justify-center">
        <div className="glass-card w-full max-w-md rounded-3xl p-6 shadow-card">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-bg-850/70 p-4">
            <p className="text-xs text-muted-300">Account Insights</p>
            <p className="mt-1 text-lg font-semibold">Northwind Software</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-300">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                Intent score
                <div className="mt-2 text-base font-semibold text-text-100">
                  87
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                ICP match
                <div className="mt-2 text-base font-semibold text-text-100">
                  High
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                Location
                <div className="mt-2 text-base font-semibold text-text-100">
                  Amsterdam
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                Next step
                <div className="mt-2 text-base font-semibold text-text-100">
                  Push to CRM
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-300">
            Tech stack
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-100">
              {["HubSpot", "AWS", "Segment", "Slack"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-bg-850/80 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

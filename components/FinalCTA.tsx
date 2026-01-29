import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-850/80 p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary-500/30 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-accent-400/30 blur-[120px]" />
          </div>
          <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold">
              Klaar om je pipeline te versnellen?
            </h2>
            <button className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-bg-900 shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400">
              Plan een demo
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

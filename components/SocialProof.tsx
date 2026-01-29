import ScrollReveal from "./ScrollReveal";

const logos = ["Atlas", "Nova", "Pulse", "Keystone", "Everly"];

export default function SocialProof() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <ScrollReveal>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-300">
          Trusted by high-growth teams
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm text-muted-300 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3"
            >
              {logo}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

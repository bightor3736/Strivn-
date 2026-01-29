import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    title: "Zoek je ICP",
    description: "Filter op markt, groei en fit om je ideale accounts te vinden."
  },
  {
    title: "Verrijk en scoor",
    description: "Combineer intent signals en firmographics voor prioriteit."
  },
  {
    title: "Push naar je CRM",
    description: "Sync direct naar HubSpot, Salesforce of Zapier flows."
  }
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16" id="how">
      <ScrollReveal>
        <div className="text-center">
          <p className="text-sm font-semibold text-accent-400">Hoe het werkt</p>
          <h2 className="mt-3 text-3xl font-semibold">
            Van data naar pipeline in 3 stappen
          </h2>
          <p className="mt-2 text-muted-300">
            Simpel proces, maximale impact voor sales en growth teams.
          </p>
        </div>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <ScrollReveal key={step.title}>
            <div className="glass-card rounded-3xl p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-accent-400">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-300">{step.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import ScrollReveal from "./ScrollReveal";

const features = [
  {
    title: "Bedrijfsprofielen + firmographics",
    description: "Volledige bedrijfsdata inclusief headcount, groei en omzet.",
    icon: "◎"
  },
  {
    title: "Verrijking via domein/bedrijf",
    description: "Upload lijsten en verrijk direct met betrouwbare datasets.",
    icon: "◇"
  },
  {
    title: "Segmentatie op sector/grootte/locatie",
    description: "Filter razendsnel op ICP-criteria en geografische focus.",
    icon: "△"
  },
  {
    title: "Technographics (tools/stack)",
    description: "Zie welke tech stack prospects gebruiken voor betere messaging.",
    icon: "◆"
  },
  {
    title: "Lead scoring (rules + signals)",
    description: "Combineer intent, fit en activiteit tot één score.",
    icon: "◈"
  },
  {
    title: "Integraties (HubSpot/Salesforce/Zapier)",
    description: "Push direct naar je CRM of workflow automation tooling.",
    icon: "◎"
  }
];

export default function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16" id="features">
      <ScrollReveal>
        <div className="text-center">
          <p className="text-sm font-semibold text-accent-400">Features</p>
          <h2 className="mt-3 text-3xl font-semibold">
            Features die je team direct voelt
          </h2>
          <p className="mt-2 text-muted-300">
            Krachtige modules die samenwerken als één groeiplatform.
          </p>
        </div>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <ScrollReveal key={feature.title}>
            <div className="glass-card group rounded-3xl p-6 shadow-card transition hover:-translate-y-1 hover:border-primary-400/40">
              <div className="text-xl text-accent-400">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-300">
                {feature.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

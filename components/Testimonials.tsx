import ScrollReveal from "./ScrollReveal";

const quotes = [
  {
    quote:
      "Strivn helpt ons om direct te focussen op accounts met koopintentie. Onze SDRs boeken nu 2x sneller meetings.",
    name: "Lisa Vermeer",
    role: "Head of Sales, Orbitly"
  },
  {
    quote:
      "De combinatie van intent, firmographics en tech stack maakt onze ABM-campagnes veel scherper.",
    name: "Koen Bakker",
    role: "Growth Lead, Metrica"
  }
];

export default function Testimonials() {
  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-16"
      id="testimonials"
    >
      <ScrollReveal>
        <div className="text-center">
          <p className="text-sm font-semibold text-accent-400">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold">
            Teams die sneller converteren met Strivn
          </h2>
          <p className="mt-2 text-muted-300">
            Resultaten van sales en marketing teams die hun pipeline versnellen.
          </p>
        </div>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
        {quotes.map((item) => (
          <ScrollReveal key={item.name}>
            <div className="glass-card rounded-3xl p-6">
              <p className="text-sm text-muted-300">“{item.quote}”</p>
              <p className="mt-6 font-semibold">{item.name}</p>
              <p className="text-sm text-muted-300">{item.role}</p>
            </div>
          </ScrollReveal>
        ))}
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-6">
            <p className="text-sm font-semibold text-accent-400">Case study</p>
            <h3 className="mt-4 text-2xl font-semibold">+68% pipeline groei</h3>
            <p className="mt-2 text-sm text-muted-300">
              Techscale Europe stuurde verrijkte leads direct naar HubSpot en zag
              een 4x hogere conversion rate binnen 60 dagen.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-300">
              Gemiddelde dealwaarde
              <p className="mt-2 text-lg font-semibold text-text-100">€48k</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

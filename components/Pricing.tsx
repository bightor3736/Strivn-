"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const tiers = [
  {
    name: "Starter",
    price: "vanaf €...",
    description: "Voor teams die hun eerste enrichment workflows bouwen.",
    features: ["Essentiële firmographics", "Basis verrijking", "Email support"],
    cta: "Start"
  },
  {
    name: "Pro",
    price: "vanaf €...",
    description: "Voor schaalbare sales teams met intent & scoring.",
    features: ["Intent + lead scoring", "Technographics", "CRM integraties"],
    cta: "Start",
    featured: true
  },
  {
    name: "Enterprise",
    price: "vanaf €...",
    description: "Custom datasets en workflows op enterprise schaal.",
    features: ["Custom datasets", "Dedicated success manager", "Security & SLA"],
    cta: "Contact sales"
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16" id="pricing">
      <ScrollReveal>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold text-accent-400">Pricing</p>
          <h2 className="text-3xl font-semibold">Pricing die meegroeit</h2>
          <p className="text-muted-300">
            Start lean en schaal wanneer je pipeline groeit.
          </p>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-muted-300">
            <span className={!isYearly ? "text-text-100" : ""}>Monthly</span>
            <button
              type="button"
              onClick={() => setIsYearly((value) => !value)}
              aria-pressed={isYearly}
              className="relative h-6 w-12 rounded-full bg-bg-850/80 transition"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-primary-400 transition ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={isYearly ? "text-text-100" : ""}>Yearly</span>
          </div>
        </div>
      </ScrollReveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <ScrollReveal key={tier.name}>
            <div
              className={`glass-card relative rounded-3xl p-6 transition hover:-translate-y-1 hover:border-primary-400/40 ${
                tier.featured ? "border-2 border-primary-400/60" : ""
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-4 right-6 rounded-full bg-accent-400 px-3 py-1 text-xs font-semibold text-bg-900">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted-300">{tier.description}</p>
              <p className="mt-4 text-2xl font-semibold text-text-100">
                {tier.price}
                <span className="text-xs font-normal text-muted-300">
                  /{isYearly ? "jaar" : "maand"}
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-text-100 transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400">
                {tier.cta}
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "Welke data leveren jullie?",
    answer:
      "Strivn levert firmographics, technographics en intent signals met continue updates."
  },
  {
    question: "Hoe werkt verrijking?",
    answer:
      "Upload een domein of bedrijfsnaam en ontvang direct verrijkte velden en scores."
  },
  {
    question: "Is dit GDPR compliant?",
    answer:
      "Ja, we volgen GDPR-richtlijnen en gebruiken alleen zakelijke data met strikte compliance."
  },
  {
    question: "Welke integraties?",
    answer:
      "Integraties met HubSpot, Salesforce en Zapier zijn beschikbaar via één klik."
  },
  {
    question: "Wat is de onboarding tijd?",
    answer:
      "Gemiddeld ben je binnen 1-2 weken live, inclusief data setup en training."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-20" id="faq">
      <ScrollReveal>
        <div className="text-center">
          <p className="text-sm font-semibold text-accent-400">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold">
            Alles wat je nodig hebt om snel te starten
          </h2>
        </div>
      </ScrollReveal>
      <div className="mt-8 space-y-3">
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <button
              key={item.question}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className="glass-card w-full rounded-2xl px-5 py-4 text-left transition hover:border-primary-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{item.question}</span>
                <span className="text-accent-400">{isOpen ? "–" : "+"}</span>
              </div>
              <div
                id={`faq-panel-${index}`}
                role="region"
                className={`grid overflow-hidden text-sm text-muted-300 transition-all ${
                  isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                }`}
              >
                <p className="min-h-0">{item.answer}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

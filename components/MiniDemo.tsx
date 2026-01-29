"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

type DemoResult = {
  company: string;
  industry: string;
  size: string;
  location: string;
  tech: string[];
  score: string;
};

const defaultResult: DemoResult = {
  company: "Aurora Analytics",
  industry: "SaaS • Data",
  size: "120 medewerkers",
  location: "Utrecht",
  tech: ["Snowflake", "HubSpot", "Notion"],
  score: "91"
};

export default function MiniDemo() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);

  const handleSubmit = () => {
    setLoading(true);
    setResult(null);
    window.setTimeout(() => {
      setResult({
        ...defaultResult,
        company: value ? value.replace("www.", "") : defaultResult.company
      });
      setLoading(false);
    }, 800);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16" id="demo">
      <ScrollReveal>
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold text-accent-400">Mini demo</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Check direct je data kwaliteit
            </h2>
            <p className="mt-2 text-muted-300">
              Voer een bedrijfsdomein in en zie hoe Strivn verrijkt met intent,
              technographics en lead score.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Bedrijfsdomein"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="w-full rounded-full border border-white/10 bg-bg-850/70 px-4 py-3 text-sm text-text-100 placeholder:text-muted-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-bg-900 shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                {loading ? "Enriching..." : "Enrich"}
              </button>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6">
            {loading && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-muted-300">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-primary-400" />
                Data wordt verrijkt...
              </div>
            )}
            {!loading && result && (
              <div className="space-y-4 text-sm text-muted-300">
                <div className="rounded-2xl border border-white/10 bg-bg-850/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em]">
                    Resultaat
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-text-100">
                    {result.company}
                  </h3>
                  <p className="mt-1">{result.industry}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    Size
                    <p className="mt-1 text-text-100">{result.size}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    Location
                    <p className="mt-1 text-text-100">{result.location}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  Tech stack
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-bg-850/80 px-3 py-1 text-xs text-text-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
                  Lead score
                  <span className="text-lg font-semibold text-text-100">
                    {result.score}
                  </span>
                </div>
              </div>
            )}
            {!loading && !result && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-muted-300">
                <p>Voer een domein in om een verrijkte preview te zien.</p>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs">
                  Bijvoorbeeld: strivn.ai
                </span>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

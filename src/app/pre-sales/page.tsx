"use client";

import { useState } from "react";
import { CTAButton } from "@/components/cta-button";
import { FunnelProgress } from "@/components/funnel-progress";

export default function PreSalesPage() {
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);

  function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      localStorage.setItem("smartpet_email", email.trim());
      setEmailSaved(true);
    }
  }

  return (
    <>
      <FunnelProgress />

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Manual vs. Smart — the difference is real
        </h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto">
          See why thousands of pet parents are switching from traditional care
          tools to an automated smart ecosystem.
        </p>
      </section>

      {/* Comparison table */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-3 pr-4 font-semibold">Task</th>
                <th className="py-3 px-4 font-semibold text-text-muted">
                  Manual
                </th>
                <th className="py-3 pl-4 font-semibold text-primary">
                  Smart Pet Care
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  task: "Litter cleaning",
                  manual: "Scoop 1–2x daily, odor lingers",
                  smart: "Auto-cleans after each use, sealed odor control",
                },
                {
                  task: "Feeding schedule",
                  manual: "Manual portioning, easy to forget",
                  smart: "App-scheduled, precise portions, remote control",
                },
                {
                  task: "Water freshness",
                  manual: "Refill bowl multiple times a day",
                  smart: "Gravity dispenser keeps water topped up all day",
                },
                {
                  task: "Hygiene",
                  manual: "Plastic bowls harbor bacteria quickly",
                  smart: "Medical-grade stainless steel, dishwasher safe",
                },
                {
                  task: "Time spent / day",
                  manual: "~20–30 min on maintenance tasks",
                  smart: "~2 min — just check the app",
                },
              ].map((row) => (
                <tr key={row.task} className="border-b border-border">
                  <td className="py-3 pr-4 font-medium">{row.task}</td>
                  <td className="py-3 px-4 text-text-muted">{row.manual}</td>
                  <td className="py-3 pl-4">{row.smart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key benefits */}
      <section className="bg-white border-y border-border py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-center mb-8">
            What you get with the smart ecosystem
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Hours saved every week",
                desc: "Automate the repetitive chores so you can focus on what matters — quality time with your pet.",
              },
              {
                title: "Healthier pet, happier home",
                desc: "Consistent portions, clean litter, and fresh water contribute to better pet health outcomes.",
              },
              {
                title: "Works while you're away",
                desc: "Traveling or at work? The system runs on schedule and sends you app updates.",
              },
              {
                title: "Built to last",
                desc: "Premium materials — stainless steel, medical-grade plastics, commercial-grade motors.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-3">
                <div className="shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-text-muted">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="max-w-md mx-auto px-4 py-12 text-center">
        {emailSaved ? (
          <div className="rounded-lg bg-accent/10 border border-accent/30 p-4">
            <p className="text-accent font-medium">
              You&apos;re on the list! We&apos;ll send you setup tips after
              purchase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEmailCapture} className="space-y-3">
            <p className="text-sm text-text-muted mb-2">
              Want setup tips sent to your inbox?
            </p>
            <div className="flex gap-2">
              <label htmlFor="email-capture" className="sr-only">
                Email address
              </label>
              <input
                id="email-capture"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-12 text-center">
        <CTAButton href="/sp">View the Smart Pet Setup</CTAButton>
      </section>
    </>
  );
}

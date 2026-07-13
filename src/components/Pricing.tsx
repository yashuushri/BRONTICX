/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

const TIERS = [
  {
    id: "starter",
    tag: "STARTER",
    name: "Edit only",
    desc: "Hand off the editing. Keep everything else.",
    rows: [
      { label: "Videos / month", value: "4 long-form" },
      { label: "Max length", value: "Up to 15 min" },
      { label: "Turnaround", value: "72 hours" },
      { label: "Revision rounds", value: "2 per video" },
      { label: "Thumbnails", value: "Add-on" },
      { label: "Strategy calls", value: "—" },
    ],
    popular: false,
    ctaText: "Book a free call",
  },
  {
    id: "growth",
    tag: "GROWTH",
    name: "Full production",
    desc: "The full packaging stack — built to grow your views.",
    rows: [
      { label: "Videos / month", value: "4 long-form + 8 shorts" },
      { label: "Max length", value: "Up to 20 min" },
      { label: "Turnaround", value: "Priority 48h" },
      { label: "Revision rounds", value: "2 per video" },
      { label: "Thumbnails", value: "1 per video + title" },
      { label: "Strategy calls", value: "1 / month" },
    ],
    popular: true,
    badge: "MOST POPULAR",
    ctaText: "Book a free call",
  },
  {
    id: "partner",
    tag: "PARTNER",
    name: "Content Partner",
    desc: "We become your content team, end to end.",
    rows: [
      { label: "Videos / month", value: "4 long-form + 12 shorts" },
      { label: "Max length", value: "Up to 30 min" },
      { label: "Turnaround", value: "Priority 48h" },
      { label: "Revision rounds", value: "2 per video" },
      { label: "Thumbnails", value: "2 options per video + title" },
      { label: "Strategy calls", value: "2 / month + ideas & scripts" },
    ],
    popular: false,
    ctaText: "Book a free call",
  },
];

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="py-14 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div className="text-left">
            <span className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase block mb-1.5">
              PRICING
            </span>
            <h2 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight">
              Start where you are.<br />Scale when you're ready.
            </h2>
          </div>
          <div className="text-left md:text-left text-zinc-500 font-sans text-xs sm:text-sm leading-relaxed font-medium">
            Month to month. No contracts.<br />Cancel anytime.
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch mb-8">
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col justify-between p-6 rounded-2xl bg-[#090909]/60 relative transition-all duration-300 ${
                tier.popular
                  ? "border border-zinc-700/80 shadow-2xl shadow-zinc-950"
                  : "border border-zinc-900/85 hover:border-zinc-800"
              }`}
            >
              {/* Popular Pill Badge on top of card */}
              {tier.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white text-black font-sans text-[8px] font-black tracking-widest px-3.5 py-0.5 rounded-full shadow-md z-10">
                  {tier.badge}
                </div>
              )}

              {/* Card Contents */}
              <div className="text-left mt-1">
                <span className="text-zinc-500 text-[9px] font-bold tracking-[0.15em] uppercase block mb-1">
                  {tier.tag}
                </span>
                <span className="font-sans font-bold text-lg text-white block mb-1.5">
                  {tier.name}
                </span>
                <p className="text-zinc-400 text-[11px] sm:text-xs mb-6 leading-relaxed font-normal min-h-[36px]">
                  {tier.desc}
                </p>

                {/* Table rows of values and labels */}
                <div className="space-y-0.5 mb-6 border-t border-zinc-900/60 pt-3">
                  {tier.rows.map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex justify-between items-center py-2.5 border-b border-zinc-900/50 last:border-b-0 text-[11px] sm:text-xs"
                    >
                      <span className="text-zinc-500 font-medium">{row.label}</span>
                      <span className="text-zinc-200 font-bold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan(tier.tag)}
                className={`w-full py-2 rounded-full font-sans font-bold text-xs tracking-tight transition-all duration-200 cursor-pointer ${
                  tier.popular
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-transparent border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900/30"
                }`}
              >
                {tier.ctaText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer text under the plans */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-zinc-500 text-[10px] leading-relaxed text-center max-w-none w-full whitespace-normal sm:whitespace-nowrap font-medium">
          <span className="inline-block w-1.2 h-1.2 rounded-full bg-emerald-500 opacity-40 shrink-0" />
          <span>
            Need more volume or longer videos? Tailor on call. Limited onboarding to keep quality high.
          </span>
        </div>

      </div>
    </section>
  );
}

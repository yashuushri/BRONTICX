/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const STEPS = [
  {
    num: "01",
    title: "Book a call",
    desc: "We review your channel and build a growth plan together. Free, no commitment.",
  },
  {
    num: "02",
    title: "Send footage",
    desc: "Drop recordings in a shared Drive folder. A quick brief on Discord and you're done.",
  },
  {
    num: "03",
    title: "We produce",
    desc: "Editing, thumbnail, title, and SEO, all handled. Progress updates at every stage.",
  },
  {
    num: "04",
    title: "Publish & grow",
    desc: "Delivered in 72 hours with two revision rounds included. Upload and watch it climb.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Left Aligned to match reference */}
        <div className="text-left max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35 }}
            className="text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
          >
            HOW IT WORKS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight"
          >
            Your only job is to record.
          </motion.h2>
        </div>

        {/* Steps Grid - Minimal Columns, No Background Boxes to match reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 items-start">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex flex-col text-left"
            >
              <span className="font-sans font-bold text-zinc-600 text-sm mb-4">
                {step.num}
              </span>
              <h3 className="font-sans font-bold text-lg text-white mb-2">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

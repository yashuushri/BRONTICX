/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function Stats() {
  return (
    <section id="real-problem" className="pt-28 pb-16 bg-black text-center relative overflow-hidden border-b border-zinc-900/45">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-zinc-500 text-[11px] font-bold tracking-[0.25em] uppercase"
        >
          THE REAL PROBLEM
        </motion.span>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5"
        >
          Editing is eating your channel.
        </motion.h2>

        {/* Core Paragraphs */}
        <div className="space-y-4 max-w-xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Every hour spent in the timeline is an hour lost on ideas, recording, or your audience. A freelancer fixes one video—it doesn't fix your system.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-zinc-300 font-medium"
          >
            <span className="text-white font-bold">You don't have a content problem. You have a production problem.</span>{" "}
            We built BRONTICX to solve that.
          </motion.p>
        </div>

      </div>
    </section>
  );
}

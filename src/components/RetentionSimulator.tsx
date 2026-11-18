/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const COMPARISON_ROWS = [
  {
    feature: "Video editing",
    freelancer: "Yes",
    agency: "Yes",
    bronticx: "Yes (retention-optimized)",
  },
  {
    feature: "Thumbnails & titles",
    freelancer: "Rarely",
    agency: "Sometimes",
    bronticx: "Included",
  },
  {
    feature: "Ideas & scripting",
    freelancer: "No",
    agency: "No",
    bronticx: "In-house (Studio plan)",
  },
  {
    feature: "Growth strategy & SEO",
    freelancer: "No",
    agency: "No",
    bronticx: "In-house",
  },
  {
    feature: "Turnaround",
    freelancer: "Days to weeks",
    agency: "~1 week",
    bronticx: "~72 hours",
  },
  {
    feature: "Revisions",
    freelancer: "Often paid extra",
    agency: "Slow rounds",
    bronticx: "2 fast rounds, included",
  },
  {
    feature: "Commitment",
    freelancer: "Per project",
    agency: "Contracts",
    bronticx: "Month to month",
  },
];

export default function RetentionSimulator() {
  return (
    <section id="simulator" className="py-12 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section Left Aligned */}
        <div className="text-left max-w-4xl mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-zinc-500 text-[10px] font-bold tracking-[0.25em] uppercase block mb-2"
          >
            WHY CREATORS CHOOSE US
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight"
          >
            An editor delivers a video.<br />
            A studio improves the whole upload.
          </motion.h2>
        </div>

        {/* Desktop Table (Full Screen) - Completely borderless */}
        <div className="hidden md:block w-full overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-zinc-900/60">
                {/* Features label column */}
                <th className="py-3 pr-3 pl-0 text-zinc-600 font-sans text-[10px] font-semibold tracking-wider uppercase w-[28%]"></th>
                
                {/* Freelancer Column */}
                <th className="p-3 text-zinc-500 font-sans text-[11px] font-bold tracking-wider uppercase w-[23%]">
                  Freelance Editor
                </th>
                
                {/* Agency Column */}
                <th className="p-3 text-zinc-500 font-sans text-[11px] font-bold tracking-wider uppercase w-[23%]">
                  Editing Agency
                </th>
                
                {/* BRONTICX Highlighted Column */}
                <th className="p-3 text-white font-sans text-[11px] font-black tracking-wider uppercase w-[26%] bg-[#080808] border-l border-zinc-900 relative">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white tracking-wider">BRONTICX</span>
                    <span className="bg-white text-black font-sans text-[8px] uppercase font-black px-1.5 py-0.5 rounded-full tracking-wide">
                      STUDIO
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-zinc-900/50">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-950/20 transition-colors duration-200">
                  {/* Feature Label */}
                  <td className="py-3.5 pr-3 pl-0 font-sans font-bold text-[12px] sm:text-[13px] text-white">
                    {row.feature}
                  </td>
                  
                  {/* Freelancer Cell */}
                  <td className="p-3.5 font-sans text-xs text-zinc-500 font-medium">
                    {row.freelancer}
                  </td>
                  
                  {/* Agency Cell */}
                  <td className="p-3.5 font-sans text-xs text-zinc-500 font-medium">
                    {row.agency}
                  </td>
                  
                  {/* BRONTICX Cell Highlighted */}
                  <td className="p-3.5 font-sans text-xs sm:text-[13px] text-white bg-[#080808] border-l border-zinc-900 font-extrabold">
                    {row.bronticx}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Mobile Layout (Clean, simplified, borderless list) */}
        <div className="md:hidden space-y-6">
          {COMPARISON_ROWS.map((row, idx) => (
            <div key={idx} className="border-b border-zinc-900/60 pb-5 last:border-0 last:pb-0 text-left">
              <h3 className="font-sans font-bold text-sm text-white mb-3">
                {row.feature}
              </h3>
              
              <div className="grid grid-cols-12 gap-2 text-xs">
                {/* BRONTICX */}
                <div className="col-span-12 flex items-center justify-between bg-[#080808] border border-zinc-900 px-3 py-2 rounded-lg mb-2">
                  <span className="text-zinc-400 font-medium">BRONTICX Studio</span>
                  <span className="text-white font-extrabold">{row.bronticx}</span>
                </div>
                
                {/* Freelancer */}
                <div className="col-span-6 flex justify-between px-3 py-1 text-[11px]">
                  <span className="text-zinc-600">Freelancer:</span>
                  <span className="text-zinc-400 font-medium">{row.freelancer}</span>
                </div>
                
                {/* Agency */}
                <div className="col-span-6 flex justify-between px-3 py-1 text-[11px] border-l border-zinc-900/40">
                  <span className="text-zinc-600">Agency:</span>
                  <span className="text-zinc-400 font-medium">{row.agency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

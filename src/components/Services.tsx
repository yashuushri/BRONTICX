/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const SERVICES = [
  {
    num: "01",
    title: "Ideas & research",
    desc: "We study your niche and competitors, then bring you video ideas with proven demand before you ever hit record.",
    badge: "Validated ideas",
  },
  {
    num: "02",
    title: "Scripting",
    desc: "Hooks, structure and pacing written for retention. Your voice, engineered to keep people watching.",
    badge: "Higher retention",
  },
  {
    num: "03",
    title: "Long-form editing",
    desc: "Retention-optimized edits for gaming, IRL, challenges and story content.",
    badge: "Built to hold viewers",
  },
  {
    num: "04",
    title: "Shorts & repurposing",
    desc: "Your best moments cut into vertical content that stops the scroll and more uploads from the same footage.",
    badge: "More uploads, same footage",
  },
  {
    num: "05",
    title: "Thumbnails & titles",
    desc: "The packaging gets the click. Designed on psychology and tested against your niche.",
    badge: "Made for the click",
  },
  {
    num: "06",
    title: "SEO & strategy",
    desc: "Tags, descriptions and a content calendar that turn views into subscribers and subscribers into momentum.",
    badge: "Found in search",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8 items-start text-left">
          {/* Left Heading */}
          <div className="lg:col-span-6">
            <span className="text-zinc-500 text-[10px] font-bold tracking-[0.25em] uppercase block mb-1.5">
              WHAT WE DO
            </span>
            <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              One team for editing,<br className="hidden sm:inline" /> packaging, and growth.
            </h2>
          </div>

          {/* Right Paragraph description */}
          <div className="lg:col-span-6 lg:pt-5">
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
              Not a freelancer. We handle editing, packaging, and growth so every upload is built to perform.
            </p>
          </div>
        </div>

        {/* List Row Deliverables */}
        <div className="border-t border-zinc-900/60">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group cursor-pointer flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-5 py-4 items-start md:items-center border-b border-zinc-900/60 text-left hover:translate-x-1.5 transition-transform duration-200 ease-out"
            >
              {/* Number indicator */}
              <div className="md:col-span-1 font-mono text-[11px] text-zinc-650 group-hover:text-zinc-450 font-bold tracking-wider transition-colors duration-300">
                {service.num}
              </div>

              {/* Deliverable Title */}
              <div className="md:col-span-3 font-sans font-extrabold text-white text-xs sm:text-sm tracking-tight">
                {service.title}
              </div>

              {/* Deliverable Description */}
              <div className="md:col-span-6 text-zinc-450 group-hover:text-zinc-200 text-xs sm:text-sm font-normal leading-relaxed transition-colors duration-300">
                {service.desc}
              </div>

              {/* Deliverable Badge Pill */}
              <div className="md:col-span-2 flex md:justify-end w-full md:w-auto mt-1.5 md:mt-0">
                <span className="bg-zinc-900/40 border border-zinc-800/60 text-zinc-400 group-hover:text-zinc-300 group-hover:border-zinc-700/80 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap transition-colors duration-300">
                  {service.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

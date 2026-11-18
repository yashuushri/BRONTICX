/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface TestimonialsProps {
  onNavigate?: (sectionId: string) => void;
}

const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Ruhi Cenet",
    subs: "18.4M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe17qKfbY3YX2ZMzHBgsYA9PSJu8FWwJe3qD4nX2f5s-F6S1zVglYECvWK&s=10",
    quote: "Coming back from filming abroad with dozens of hours of raw documentary footage used to stall my upload schedule for weeks. BRONTICX shaped the narrative cut, tightened the pacing, and layered the sound design without losing the feel of the story."
  },
  {
    id: "t-2",
    name: "Diana Kidisyuk",
    subs: "132M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBRN4LJVz47ONv4sPYEmIL7DEM3vP-f9nfif8hFQuInCsU0Ptob2W3cM&s=10",
    quote: "We needed stronger thumbnail packaging that popped instantly on mobile home feeds without looking cluttered. Their graphic design team dialed in our color contrast, facial expressions, and A/B thumbnail concepts, and our CTR climbed right away."
  },
  {
    id: "t-3",
    name: "Niko Omilana",
    subs: "8.86M subscribers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSii7YgAVKphZc_NfNQ8KMY-3lmrFyv8w6t8B92S90c9A&s=10",
    quote: "My shoots have chaotic multi-camera angles and a lot of unscripted moments, so timing is everything. Their editors actually know when to let a beat breathe and when to cut fast, and they turn heavy raw footage around right on schedule."
  }
];

export default function Testimonials({ onNavigate }: TestimonialsProps) {
  const handleBookClick = () => {
    if (onNavigate) {
      onNavigate("booking");
    } else {
      const el = document.getElementById("booking");
      if (el) {
        const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="testimonials" className="py-14 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35 }}
            className="text-zinc-500 text-[10px] font-bold tracking-[0.25em] uppercase block mb-2"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight"
          >
            What creators say about working with us.
          </motion.h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#090909]/60 border border-zinc-900/80 flex flex-col justify-between text-left relative group hover:border-zinc-850 transition-colors duration-200"
            >
              <div>
                {/* Custom Quote Symbol */}
                <span className="text-[#222222] font-serif text-4xl font-black block leading-none select-none mb-2">
                  “
                </span>

                {/* Testimonial Text */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal mb-6">
                  {t.quote}
                </p>
              </div>

              {/* Creator Profile Row */}
              <div className="flex items-center gap-2.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-8.5 h-8.5 rounded-full object-cover border border-zinc-800"
                />
                <div className="flex flex-col text-left">
                  <span className="font-sans font-bold text-xs text-white leading-tight">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-0.5">
                    {t.subs}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button under Testimonials */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleBookClick}
            className="px-6 py-2.5 bg-white text-black font-sans font-bold rounded-full text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Book a free strategy call
          </button>
          <span className="text-zinc-650 text-[10px] font-medium">
            Free 30-min call • Leave with a growth plan either way
          </span>
        </div>

      </div>
    </section>
  );
}

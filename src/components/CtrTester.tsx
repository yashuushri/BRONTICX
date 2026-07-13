/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Brent Rivera",
    subs: "43.1M subscribers • Actor & Creator",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nckg4JPK13gMS2o4E9ZVGXg6bHK0PgwVXTe3YCmvKHksU=s900-c-k-c0x00ffffff-no-rj",
    quote: "BRONTICX has taken our retention to the next level. Their quick pacing, incredible hooks, and flawless storytelling keep my audience fully engaged from start to finish. They are absolute game changers."
  },
  {
    id: "t-2",
    name: "Diana Kidisyuk",
    subs: "132M subscribers • Kids & Family",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBRN4LJVz47ONv4sPYEmIL7DEM3vP-f9nfif8hFQuInCsU0Ptob2W3cM&s=10",
    quote: "Our channel has never grown so fast! Their attention to detail, rapid turnarounds, and creative edits have helped us scale to millions of new views every week. A highly professional team!"
  },
  {
    id: "t-3",
    name: "Vanoss Gaming",
    subs: "25.9M subscribers • Gaming",
    avatar: "https://static.wikia.nocookie.net/vanoss/images/1/11/Vanoss_Icon.jpg/revision/latest?cb=20241219091147",
    quote: "The sound-design, the precise cuts, the comedic timing—they capture everything perfectly. The final edit is always polished and ready to go. I can't recommend BRONTICX Media enough."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-14 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-zinc-500 text-[10px] font-bold tracking-[0.25em] uppercase block mb-2"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#090909]/60 border border-zinc-900/80 flex flex-col justify-between text-left relative group hover:border-zinc-850 transition-all duration-300"
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
          <a
            href="#booking"
            className="px-6 py-2.5 bg-white text-black font-sans font-bold rounded-full text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95"
          >
            Book a free strategy call
          </a>
          <span className="text-zinc-650 text-[10px] font-medium">
            Free 30-min call • Leave with a growth plan either way
          </span>
        </div>

      </div>
    </section>
  );
}

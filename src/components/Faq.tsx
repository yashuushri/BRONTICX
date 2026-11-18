/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How are you different from hiring an editor?",
    answer: "An editor cuts your footage. We run your production: ideas, scripts, editing, thumbnails, titles, SEO and strategy. One team, one standard, everything built to grow the channel, not just finish the video.",
  },
  {
    question: "How fast do I get my video back?",
    answer: "72 hours for a fully edited video with thumbnail. Complex projects can take a day extra, and we always set the timeline upfront.",
  },
  {
    question: "What if I don't like the edit?",
    answer: "Every video includes two revision rounds, and we make them count. We collect your feedback properly the first time, so most creators never need the second round.",
  },
  {
    question: "Do I have to sign a contract?",
    answer: "No. Month to month, cancel anytime. Creators stay because the channel grows, not because of paperwork.",
  },
  {
    question: "Do you only work with gaming creators?",
    answer: "Gaming and IRL are our deepest expertise, but our system of packaging, retention, and strategy works across niches. If you want to grow on YouTube, we can help.",
  },
  {
    question: "What does the free call actually include?",
    answer: "We review your channel live, identify what's holding it back, and give you a concrete growth plan covering ideas, packaging and strategy. It's yours to keep either way.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    videoUrl: "",
    bottleneck: "intro",
    niche: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.videoUrl) return;

    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        videoUrl: "",
        bottleneck: "intro",
        niche: "",
      });
    }, 2800);
  };

  return (
    <section id="faq" className="py-14 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">
            FAQ
          </span>
          <h2 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight">
            Still deciding? Fair questions.
          </h2>
        </div>

        {/* Accordions */}
        <div className="border-t border-zinc-900 mb-12">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-zinc-900">
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full py-4 flex justify-between items-center text-left cursor-pointer group focus:outline-none"
                >
                  <span className="font-sans font-bold text-xs sm:text-sm text-white tracking-tight group-hover:text-zinc-200 transition-colors pr-6">
                    {item.question}
                  </span>
                  <span className="text-zinc-500 group-hover:text-white transition-colors select-none text-base font-light w-4 h-4 flex items-center justify-center">
                    {isOpen ? (
                      <span className="leading-none text-zinc-400 rotate-45 transform transition-transform duration-200">
                        +
                      </span>
                    ) : (
                      <span className="leading-none transition-transform duration-200">+</span>
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed pb-4 font-normal max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Section matching the image */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090909]/60 border border-zinc-900/85 relative transition-all duration-300">
          <div className="text-left max-w-3xl">
            <h3 className="font-sans font-extrabold text-base sm:text-lg text-white tracking-tight leading-snug mb-3">
              Not ready for a call? Send us your latest video for a quick retention review.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 font-normal">
              We'll reply with a short, honest review of what's working, what's holding it back, and what we'd change first. Free, no strings.
            </p>
            <p className="text-zinc-500 text-[11px] leading-relaxed mb-6 font-normal">
              Prefer chat?{" "}
              <a
                href="https://discord.gg/bronticx"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white underline transition-colors"
              >
                Join our Discord
              </a>
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full bg-white text-black font-sans font-bold text-xs hover:bg-zinc-200 transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              Send your video for review
            </button>
          </div>
        </div>

      </div>

      {/* Review Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#0c0c0c] border border-zinc-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Video Submitted!</h4>
                  <p className="text-zinc-400 text-sm max-w-sm">
                    We'll analyze your video and reach out to you within 24 hours with a personalized video review.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="text-left">
                  <div className="mb-6">
                    <h3 className="font-sans font-extrabold text-xl text-white tracking-tight">
                      Free Retention Review
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1">
                      Give us 24 hours to analyze your pacing, hook, and story.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Yash"
                        className="w-full bg-[#121212] border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-[#121212] border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                      />
                    </div>

                    {/* Video URL */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        YouTube Video Link
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-[#121212] border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                      />
                    </div>

                    {/* Bottleneck Choice */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Biggest Retention Bottleneck
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "intro", label: "Intro / Hook" },
                          { id: "pacing", label: "Middle Pacing" },
                          { id: "story", label: "Storytelling" },
                          { id: "outro", label: "Ending / Outro" },
                        ].map((b) => (
                          <button
                            type="button"
                            key={b.id}
                            onClick={() => setFormData({ ...formData, bottleneck: b.id })}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                              formData.bottleneck === b.id
                                ? "bg-white text-black border-white"
                                : "bg-[#121212] text-zinc-400 border-zinc-900 hover:border-zinc-800"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extra Question */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        What Niche or Game do you make content for?
                      </label>
                      <input
                        type="text"
                        value={formData.niche}
                        onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                        placeholder="e.g. Minecraft, Roblox, Tech Reviews, etc."
                        className="w-full bg-[#121212] border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 py-3.5 rounded-full bg-white text-black font-sans font-bold text-sm tracking-tight hover:bg-zinc-200 transition-all duration-200 cursor-pointer"
                  >
                    Submit for analysis
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { LegalDocumentData, PRIVACY_POLICY_DOC, TERMS_OF_SERVICE_DOC } from "../data/legalDocs";

interface LegalPageProps {
  page: "privacy" | "terms";
  onBackHome: () => void;
}

export default function LegalPage({ page, onBackHome }: LegalPageProps) {
  const doc: LegalDocumentData = page === "privacy" ? PRIVACY_POLICY_DOC : TERMS_OF_SERVICE_DOC;
  const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id ?? "");
  const sidebarNavRef = useRef<HTMLElement>(null);
  const sidebarItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Reset active section and scroll to top when switching documents
  useEffect(() => {
    setActiveId(doc.sections[0]?.id ?? "");
    if (sidebarNavRef.current) {
      sidebarNavRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page, doc.sections]);

  // Track active section while scrolling (RAF-throttled)
  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveSection = () => {
      rafId = null;
      const scrollPos = window.scrollY + 140;
      let current = doc.sections[0]?.id ?? "";

      for (const sec of doc.sections) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          current = sec.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [doc.sections]);

  // Keep the active item visible inside the sticky "What's inside this page" sidebar
  useEffect(() => {
    const navEl = sidebarNavRef.current;
    const activeBtn = sidebarItemRefs.current[activeId];
    if (!navEl || !activeBtn) return;

    const navTop = navEl.scrollTop;
    const navBottom = navTop + navEl.clientHeight;
    const btnTop = activeBtn.offsetTop;
    const btnBottom = btnTop + activeBtn.offsetHeight;

    if (btnTop < navTop + 16 || btnBottom > navBottom - 16) {
      const targetScrollTop = Math.max(
        0,
        btnTop - navEl.clientHeight / 2 + activeBtn.offsetHeight / 2
      );
      navEl.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200 pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimal Breadcrumb */}
        <div className="flex items-center pb-8 border-b border-zinc-900">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to BRONTICX Studio
          </button>
        </div>

        {/* Document Header */}
        <header className="py-10 sm:py-14 border-b border-zinc-900/80 max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 block mb-3">
            {doc.eyebrow}
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {doc.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            {doc.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-zinc-500">
            <span>Effective: {doc.effectiveDate}</span>
            <span>Updated: {doc.lastUpdated}</span>
            <span>Version: {doc.version}</span>
            <span>Estimated Read: {doc.readingTime}</span>
          </div>
        </header>

        {/* Mobile / Tablet Compact "What's inside this page" */}
        <div className="lg:hidden my-8 p-5 rounded-2xl bg-[#070707] border border-zinc-900">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 block mb-3">
            What's inside this page
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {doc.sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`text-left text-xs py-1 px-2 rounded-md transition-colors cursor-pointer truncate ${
                  activeId === sec.id
                    ? "text-white font-semibold bg-zinc-900/80"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="font-mono text-[10px] text-zinc-600 mr-2">{sec.number}</span>
                {sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise Doc Grid: Main Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 items-start">
          {/* Main Legal Prose */}
          <article className="lg:col-span-8 space-y-14 text-left">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 pb-12 border-b border-zinc-900/60 last:border-b-0"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-zinc-600 font-semibold">
                    {section.number}
                  </span>
                  <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-400 leading-[1.8] font-normal">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2.5 pl-4 border-l border-zinc-900 my-5">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-zinc-400 leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-8 space-y-8">
                    {section.subsections.map((sub) => (
                      <div key={sub.id} id={sub.id} className="scroll-mt-28">
                        <h3 className="font-sans text-sm sm:text-base font-bold text-zinc-200 mb-3">
                          {sub.title}
                        </h3>
                        <div className="space-y-3 text-xs sm:text-sm text-zinc-400 leading-[1.8] font-normal">
                          {sub.paragraphs.map((sp, spIdx) => (
                            <p key={spIdx}>{sp}</p>
                          ))}
                          {sub.bullets && sub.bullets.length > 0 && (
                            <ul className="space-y-2 pl-4 border-l border-zinc-900 my-4">
                              {sub.bullets.map((sb, sbIdx) => (
                                <li key={sbIdx} className="text-zinc-400 leading-relaxed">
                                  {sb}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Sticky Right Sidebar: What's inside this page */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 pl-6 border-l border-zinc-900/80">
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-500 block mb-4">
              What's inside this page
            </span>
            <nav
              ref={sidebarNavRef}
              aria-label="Document sections"
              className="relative space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-2"
            >
              {doc.sections.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <button
                    key={sec.id}
                    ref={(el) => {
                      sidebarItemRefs.current[sec.id] = el;
                    }}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[11px] leading-snug transition-colors cursor-pointer flex items-start gap-2 ${
                      isActive
                        ? "text-white font-semibold bg-zinc-900/70 border-l-2 border-white"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/60"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-zinc-600 shrink-0 mt-0.5">
                      {sec.number}
                    </span>
                    <span>{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}

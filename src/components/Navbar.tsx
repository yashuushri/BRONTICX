/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Flame, Calendar } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "What we do", id: "services" },
    { name: "Work", id: "work" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Pricing", id: "pricing" },
  ];

  const handleClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-zinc-950 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="logo-container"
            onClick={() => handleClick("hero")}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <div className="flex flex-col gap-[3px] w-4 mr-1">
              <span className="h-[1.5px] w-3 bg-white rounded-full transition-all duration-300 group-hover:w-4"></span>
              <span className="h-[1.5px] w-4 bg-white rounded-full transition-all duration-300"></span>
              <span className="h-[1.5px] w-2 bg-white rounded-full transition-all duration-300 group-hover:w-3"></span>
            </div>
            <span className="font-sans font-extrabold text-xs sm:text-sm tracking-[0.18em] text-white uppercase select-none">
              BRONTICX
            </span>
          </div>

          {/* Desktop Nav & CTA Grouped on Right */}
          <div className="hidden md:flex items-center gap-8">
            <nav id="desktop-nav" className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`font-sans text-[11px] sm:text-xs font-medium tracking-tight transition-colors hover:text-white cursor-pointer ${
                    activeSection === item.id ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                id="cta-book-call-nav"
                onClick={() => handleClick("booking")}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black font-sans text-[11px] font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                Book a free call
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black border-b border-zinc-950 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                    activeSection === item.id
                      ? "bg-zinc-900 text-white border-l-2 border-white"
                      : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-zinc-950 px-3">
                <button
                  id="mobile-cta-book-call"
                  onClick={() => handleClick("booking")}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-white text-black font-bold text-xs shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Strategy Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

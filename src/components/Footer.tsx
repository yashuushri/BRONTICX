/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import EmailModal from "./EmailModal";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Track rapid triple clicks on copyright to trigger password prompt
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleCopyrightClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      const newCount = clickCount + 1;
      if (newCount >= 3) {
        setClickCount(0);
        window.dispatchEvent(new Event("trigger_admin_password_prompt"));
      } else {
        setClickCount(newCount);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  return (
    <footer id="footer" className="bg-black border-t border-zinc-900/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple single row footer with extremely small typography */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left side: Logo + Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <div className="flex flex-col gap-[3px] w-4 mr-1">
                <span className="h-[1.5px] w-3 bg-white rounded-full transition-all duration-300 group-hover:w-4"></span>
                <span className="h-[1.5px] w-4 bg-white rounded-full transition-all duration-300"></span>
                <span className="h-[1.5px] w-2 bg-white rounded-full transition-all duration-300 group-hover:w-3"></span>
              </div>
              <span className="font-sans font-extrabold text-[11px] sm:text-xs tracking-[0.18em] text-white uppercase select-none">
                BRONTICX
              </span>
            </div>
            
            {/* Copyright text */}
            <span
              onClick={handleCopyrightClick}
              className="text-zinc-650 hover:text-zinc-500 transition-colors duration-200 text-[10px] sm:text-[11px] font-medium sm:border-l sm:border-zinc-900 sm:pl-3 mt-0.5 sm:mt-0 select-none cursor-pointer"
              title="Click 3 times rapidly to authenticate"
            >
              © 2026 BRONTICX Media
            </span>
          </div>

          {/* Right side: Elegant minimal list of links with tiny font sizes */}
          <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1.5 font-sans text-[10px] sm:text-[11px] text-zinc-500 font-medium">
            <button
              onClick={() => onNavigate("work")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => onNavigate("work")}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Thumbnails
            </button>
            <a
              href="https://x.com/bronticx"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              X
            </a>
            <a
              href="https://discord.gg/bronticx"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Discord
            </a>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              Email
            </button>
          </div>

        </div>

      </div>

      {/* Floating email modal */}
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </footer>
  );
}

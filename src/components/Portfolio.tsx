/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

interface SpecItem {
  problem: string;
  whatWeDid: string;
  result: string;
}

interface PortfolioItem {
  id: string;
  label: string;
  src: string;
  poster?: string;
  aspectRatio: string;
  spec: SpecItem;
}

const COLUMN_1_ITEMS: PortfolioItem[] = [
  {
    id: "lf-1",
    label: "Long form-Gaming",
    src: "https://bixonticmedia.com/video/Video4.mp4",
    poster: "https://i.ytimg.com/vi/sbhQ6Ay-2GU/maxresdefault.jpg",
    aspectRatio: "aspect-video",
    spec: {
      problem: "Hours of raw gameplay with no story — viewers had no reason to stay.",
      whatWeDid: "Story-first cut, pattern-interrupt pacing, animated captions and sound design.",
      result: "Improved first 30-second pacing."
    }
  },
  {
    id: "sh-1",
    label: "Shorts",
    src: "https://bixonticmedia.com/video/Short1.mp4",
    aspectRatio: "aspect-[3/4] md:aspect-[4/5]",
    spec: {
      problem: "Great long-form moments dying unseen — nothing built for the feed.",
      whatWeDid: "Vertical reframe, bold captions, beat-matched cuts under 3 seconds each.",
      result: "Reduced dead space across multiple POVs."
    }
  }
];

const COLUMN_2_ITEMS: PortfolioItem[] = [
  {
    id: "lf-2",
    label: "Long form-Gaming",
    src: "https://bixonticmedia.com/video/Video4.mp4",
    poster: "https://i.ytimg.com/vi/z7os8-Qj3Ec/maxresdefault.jpg",
    aspectRatio: "aspect-video",
    spec: {
      problem: "Strong idea, weak opening — the first 30 seconds were losing viewers.",
      whatWeDid: "Re-structured the hook, front-loaded the payoff, tightened every dead second.",
      result: "Built a clearer story structure."
    }
  },
  {
    id: "sh-2",
    label: "Shorts",
    src: "https://bixonticmedia.com/video/Short3.mp4",
    aspectRatio: "aspect-[3/4] md:aspect-[4/5]",
    spec: {
      problem: "Long gaps between big uploads — the channel went quiet in between.",
      whatWeDid: "A repurposing system: one recording session turned into multiple shorts.",
      result: "Added cleaner sound design and comedic timing."
    }
  }
];

interface LazyVideoProps {
  src: string;
  isMuted: boolean;
  poster?: string;
  className?: string;
  playsInline?: boolean;
  loop?: boolean;
  isHovered?: boolean;
}

function LazyVideo({
  src,
  isMuted,
  poster,
  className = "w-full h-full object-cover",
  playsInline = true,
  loop = true,
  isHovered = false,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "300px", // Even wider margin for absolute safety
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Directly adjust muted property to prevent browser policies or sync lag
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Play only when both in view AND hovered to save CPU, bandwidth & honor user instruction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && isHovered) {
      const playPromise = video.play();
      playPromiseRef.current = playPromise;
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Silent safe catch for standard browser policy interruptions
          console.debug("Autoplay/play was prevented or interrupted:", err);
        });
      }
    } else {
      const currentPromise = playPromiseRef.current;
      if (currentPromise !== null) {
        currentPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            // Even if play was interrupted/rejected, ensure we call pause
            video.pause();
          });
        playPromiseRef.current = null;
      } else {
        video.pause();
      }
    }
  }, [isInView, isHovered]);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-zinc-950 overflow-hidden">
      {/* Eagerly loaded high-priority poster image shown instantly */}
      {poster && (
        <img
          src={poster}
          alt=""
          loading="eager"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none z-10 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={isMuted}
        playsInline={playsInline}
        preload="auto"
        className={className}
      />
    </div>
  );
}

function PortfolioVideo({ src, poster, className, label }: { src: string; poster?: string; className?: string; label?: string }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleContainerClick = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick}
      className={`relative overflow-hidden bg-zinc-950 rounded-2xl border border-zinc-900/60 group cursor-pointer ${className}`}
    >
      <LazyVideo src={src} isMuted={isMuted} isHovered={isHovered} poster={poster} />
      {label && (
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-md border border-zinc-800/40 tracking-wide z-10">
          {label}
        </span>
      )}

      {/* Zero pause overlay/play button clutter on hover state for absolute smooth playback */}

      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 bg-black/75 hover:bg-black border border-zinc-800/80 text-zinc-300 hover:text-white p-2 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}

function FeaturedVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleContainerClick = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick}
      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900/60 group mb-12 cursor-pointer"
    >
      <LazyVideo 
        src="https://bixonticmedia.com/video/Video2.mp4" 
        isMuted={isMuted} 
        isHovered={isHovered} 
        poster="https://i.ytimg.com/vi/AJBU18gA5Uo/maxresdefault.jpg" 
      />
      
      {/* Zero pause overlay/play button clutter on hover state for absolute smooth playback */}

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/85 hover:bg-black border border-zinc-800 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md z-10"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col text-left">
      <PortfolioVideo
        src={item.src}
        poster={item.poster}
        label={item.label}
        className={item.aspectRatio}
      />
      
      {/* Spec sheet layout below each card */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-start gap-4 text-xs">
          <span className="w-24 shrink-0 font-sans font-bold text-zinc-600 uppercase tracking-wider text-[10px] pt-0.5">PROBLEM</span>
          <p className="text-zinc-400 leading-normal text-[11px] sm:text-xs">{item.spec.problem}</p>
        </div>
        <div className="flex items-start gap-4 text-xs">
          <span className="w-24 shrink-0 font-sans font-bold text-zinc-600 uppercase tracking-wider text-[10px] pt-0.5">WHAT WE DID</span>
          <p className="text-zinc-400 leading-normal text-[11px] sm:text-xs">{item.spec.whatWeDid}</p>
        </div>
        <div className="flex items-start gap-4 text-xs">
          <span className="w-24 shrink-0 font-sans font-bold text-zinc-600 uppercase tracking-wider text-[10px] pt-0.5">RESULT</span>
          <p className="text-white font-bold leading-normal text-[11px] sm:text-xs">{item.spec.result}</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="work" className="py-12 bg-black border-b border-zinc-900/45 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Layout */}
        <div className="mb-6">
          <div className="text-left flex flex-col items-start">
            <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              THE STANDARD
            </span>
            <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              This is what your videos could look like.
            </h2>
          </div>
        </div>

        {/* Highlight Main Featured Video */}
        <div className="max-w-3xl mx-auto mb-8">
          <FeaturedVideo />
        </div>

        {/* 2-Column Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Column 1 */}
          <div className="space-y-8">
            {COLUMN_1_ITEMS.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900/40 hover:border-zinc-800/60 transition-colors duration-300">
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            {COLUMN_2_ITEMS.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900/40 hover:border-zinc-800/60 transition-colors duration-300">
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

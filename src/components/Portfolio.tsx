/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SpecItem {
  problem: string;
  whatWeDid: string;
  result: string;
}

interface PortfolioItem {
  id: string;
  label?: string;
  src?: string;
  poster?: string;
  previewGif?: string;
  aspectRatio: string;
  spec: SpecItem;
}

const COLUMN_1_ITEMS: PortfolioItem[] = [
  {
    id: "lf-1",
    poster: "https://img.youtube.com/vi/VrVq7G-QrdY/maxresdefault.jpg",
    previewGif: "https://i.ytimg.com/an_webp/VrVq7G-QrdY/mqdefault_6s.webp?du=3000&sqp=CNrf99cG&rs=AOn4CLDtXda-YPamQhAEWbEZDOT53Q7anw",
    aspectRatio: "aspect-video",
    spec: {
      problem: "Hours of raw gameplay with no story, so viewers had no reason to stay.",
      whatWeDid: "Story-first cut, pattern-interrupt pacing, animated captions and sound design.",
      result: "Improved first 30-second pacing."
    }
  }
];

const COLUMN_2_ITEMS: PortfolioItem[] = [
  {
    id: "lf-2",
    poster: "https://img.youtube.com/vi/vGI4m91TbH0/maxresdefault.jpg",
    previewGif: "https://i.ytimg.com/an_webp/-B2IBgnNbG4/mqdefault_6s.webp?du=3000&sqp=CJSa-NcG&rs=AOn4CLD0rR-LnsHg_hqPRkAgHCdDUq3mtA",
    aspectRatio: "aspect-video",
    spec: {
      problem: "Strong idea, weak opening. The first 30 seconds were losing viewers.",
      whatWeDid: "Re-structured the hook, front-loaded the payoff, tightened every dead second.",
      result: "Built a clearer story structure."
    }
  }
];

interface LazyVideoProps {
  src?: string;
  isMuted: boolean;
  poster?: string;
  previewGif?: string;
  className?: string;
  playsInline?: boolean;
  loop?: boolean;
  isHovered?: boolean;
}

function LazyVideo({
  src,
  isMuted,
  poster,
  previewGif,
  className = "w-full h-full object-cover",
  playsInline = true,
  loop = true,
  isHovered = false,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [shouldLoadPreview, setShouldLoadPreview] = useState(false);

  useEffect(() => {
    if (isHovered && previewGif) {
      setShouldLoadPreview(true);
    }
  }, [isHovered, previewGif]);

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
        rootMargin: "300px",
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (previewGif || !src) return;
    const video = videoRef.current;
    if (!video) return;

    if (isInView && isHovered) {
      const playPromise = video.play();
      playPromiseRef.current = playPromise;
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
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
            video.pause();
          });
        playPromiseRef.current = null;
      } else {
        video.pause();
      }
    }
  }, [isInView, isHovered, previewGif, src]);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-zinc-950 overflow-hidden">
      {/* Static high-res YouTube thumbnail */}
      {poster && (
        <img
          src={poster}
          alt=""
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none z-10 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Animated WebP / GIF preview loaded on demand when hovered */}
      {previewGif && shouldLoadPreview ? (
        <img
          src={previewGif}
          alt=""
          decoding="async"
          referrerPolicy="no-referrer"
          className={className}
        />
      ) : src ? (
        <video
          ref={videoRef}
          src={src}
          loop={loop}
          muted={isMuted}
          playsInline={playsInline}
          preload="metadata"
          className={className}
        />
      ) : null}
    </div>
  );
}

function PortfolioVideo({
  src,
  poster,
  previewGif,
  className,
  label,
}: {
  src?: string;
  poster?: string;
  previewGif?: string;
  className?: string;
  label?: string;
}) {
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
      <LazyVideo src={src} isMuted={isMuted} isHovered={isHovered} poster={poster} previewGif={previewGif} />
      {label && (
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-md border border-zinc-800/40 tracking-wide z-20">
          {label}
        </span>
      )}

      {!previewGif && src && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-black/75 hover:bg-black border border-zinc-800/80 text-zinc-300 hover:text-white p-2 rounded-full flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>
      )}
    </div>
  );
}

function FeaturedVideo() {
  const [isHovered, setIsHovered] = useState(false);

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
        isMuted={true}
        isHovered={isHovered} 
        poster="https://img.youtube.com/vi/WzCPFhoqwY0/maxresdefault.jpg"
        previewGif="https://i.ytimg.com/an_webp/WzCPFhoqwY0/mqdefault_6s.webp?du=3000&sqp=CO_r99cG&rs=AOn4CLBxdpBi8iRf0R3swJW-16mAziHxiw"
      />
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex flex-col text-left">
      <PortfolioVideo
        src={item.src}
        poster={item.poster}
        previewGif={item.previewGif}
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

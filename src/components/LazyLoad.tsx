/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadProps {
  children: ReactNode;
  placeholderHeight?: string; // e.g. "200px" or "100%"
  rootMargin?: string;
  threshold?: number;
}

export default function LazyLoad({
  children,
  placeholderHeight = "120px",
  rootMargin = "120px",
  threshold = 0.01,
}: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (!window.IntersectionObserver) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} className="w-full">
      {isLoaded ? (
        children
      ) : (
        <div
          style={{ height: placeholderHeight }}
          className="w-full bg-[#070707]/60 border border-zinc-950 rounded-2xl animate-pulse flex items-center justify-center text-zinc-800 text-[10px] font-mono font-medium tracking-wider"
        >
          LOADING CONTENT...
        </div>
      )}
    </div>
  );
}

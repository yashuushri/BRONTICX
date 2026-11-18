/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

function canScrollInDirection(el: HTMLElement, deltaY: number): boolean {
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  if (overflowY !== "auto" && overflowY !== "scroll" && overflowY !== "overlay") {
    return false;
  }
  if (el.scrollHeight <= el.clientHeight + 1) {
    return false;
  }
  if (deltaY < 0) {
    return el.scrollTop > 0;
  }
  if (deltaY > 0) {
    return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  }
  return false;
}

function isInsideScrollableOrModal(target: EventTarget | null, deltaY: number): boolean {
  let node = target instanceof HTMLElement ? target : null;
  while (node && node !== document.body && node !== document.documentElement) {
    if (canScrollInDirection(node, deltaY)) {
      return true;
    }
    const style = window.getComputedStyle(node);
    if (
      style.position === "fixed" &&
      node.clientHeight >= window.innerHeight * 0.8 &&
      node.clientWidth >= window.innerWidth * 0.8
    ) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (prefersReducedMotion.matches || coarsePointer.matches) {
      return;
    }

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId: number | null = null;
    let lastTime = 0;
    let isSelfScrolling = false;
    let lastTrackpadTimestamp = 0;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      lastTime = 0;
    };

    const tick = (now: number) => {
      if (!lastTime) {
        lastTime = now;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const maxScroll = getMaxScroll();
      if (targetY < 0) targetY = 0;
      if (targetY > maxScroll) targetY = maxScroll;

      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        isSelfScrolling = true;
        window.scrollTo({ top: currentY, behavior: "instant" as ScrollBehavior });
        isSelfScrolling = false;
        stopAnimation();
        return;
      }

      // Crisp, zero-lag exponential smoothing tuned for 60-144Hz displays
      const factor = 1 - Math.exp(-15 * dt);
      currentY += diff * factor;

      isSelfScrolling = true;
      window.scrollTo({ top: currentY, behavior: "instant" as ScrollBehavior });
      isSelfScrolling = false;

      rafId = requestAnimationFrame(tick);
    };

    const interruptSmoothScroll = () => {
      if (rafId !== null) {
        stopAnimation();
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (prefersReducedMotion.matches) return;
      if (e.ctrlKey || e.metaKey) return;
      if (e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (isInsideScrollableOrModal(e.target, e.deltaY)) return;

      const now = performance.now();
      const looksLikePrecisionTrackpad =
        e.deltaMode === 0 &&
        (Math.abs(e.deltaY) < 42 || !Number.isInteger(e.deltaY) || Math.abs(e.deltaX) > 0);

      // Precision trackpads already have native 60-120Hz OS momentum; let them scroll at 0ms latency
      if (looksLikePrecisionTrackpad || now - lastTrackpadTimestamp < 220) {
        if (looksLikePrecisionTrackpad) {
          lastTrackpadTimestamp = now;
        }
        interruptSmoothScroll();
        return;
      }

      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 16;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      if (rafId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      const maxScroll = getMaxScroll();
      targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

      if (rafId === null) {
        lastTime = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleExternalScroll = () => {
      if (!isSelfScrolling && rafId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (scrollKeys.includes(e.key)) {
        interruptSmoothScroll();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleExternalScroll, { passive: true });
    window.addEventListener("touchstart", interruptSmoothScroll, { passive: true });
    window.addEventListener("mousedown", interruptSmoothScroll, { passive: true });
    window.addEventListener("click", interruptSmoothScroll, { passive: true });
    window.addEventListener("resize", interruptSmoothScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      stopAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleExternalScroll);
      window.removeEventListener("touchstart", interruptSmoothScroll);
      window.removeEventListener("mousedown", interruptSmoothScroll);
      window.removeEventListener("click", interruptSmoothScroll);
      window.removeEventListener("resize", interruptSmoothScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}

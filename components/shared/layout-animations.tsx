"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function LayoutAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Smooth Scroll ──────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-1 flex-col bg-background text-foreground transition-colors duration-350 selection:bg-zinc-800 selection:text-zinc-100"
    >
      {children}
    </div>
  );
}

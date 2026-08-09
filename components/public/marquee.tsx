"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const clone = track.innerHTML;
      track.innerHTML = clone + clone;
      const distance = track.scrollWidth / 2;
      gsap.to(track, {
        x: -distance,
        duration: 24,
        ease: "linear",
        repeat: -1,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden bg-primary py-3">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap font-mono text-sm uppercase tracking-widest text-primary-foreground"
      >
        <span className="mx-6">HIBACHI LOU</span>
        <span className="mx-6">•</span>
        <span className="mx-6">PITTSBURGH</span>
        <span className="mx-6">•</span>
        <span className="mx-6">412</span>
        <span className="mx-6">•</span>
        <span className="mx-6">HIBACHI LOU</span>
        <span className="mx-6">•</span>
        <span className="mx-6">PITTSBURGH</span>
        <span className="mx-6">•</span>
        <span className="mx-6">412</span>
        <span className="mx-6">•</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["FIRE", "FLAVOR", "FRESH", "412"];

export default function ExperiencePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = containerRef.current?.querySelector(".experience-image img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.92, y: 60 },
          {
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-1 flex-col bg-background">
      <div ref={containerRef} className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&auto=format&fit=crop&q=80"
            alt="Hibachi experience"
            fill
            className="experience-image object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="max-w-3xl space-y-8 text-cream">
            <div className="space-y-4">
              <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">
                IT&apos;S NOT<br />
                JUST FOOD.<br />
                IT&apos;S THE SHOW.
              </h2>
              <p className="text-lg text-cream/80 md:text-xl leading-relaxed">
                Watch the grill, smell the flame, and eat while the show is still happening.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-[0.2em] text-cream/90">
              {WORDS.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

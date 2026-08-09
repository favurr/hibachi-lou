"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SocialProofPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-1 flex-col bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div ref={contentRef} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Social proof</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            PITTSBURGH<br />
            KNOWS WHAT&apos;S UP.
          </h2>
          <div className="mt-6 flex flex-wrap items-baseline gap-6">
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">BEST OF PGH</p>
              <p className="font-heading text-3xl font-bold text-foreground">2025</p>
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">#1</p>
              <p className="font-heading text-3xl font-bold text-foreground">FOOD TRUCK</p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">
              &ldquo;Best hibachi I&apos;ve had from a truck. The energy, the heat, the flavor.&rdquo;
            </blockquote>
            <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">
              &ldquo;Booked Lou for our company picnic and it was the main event.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

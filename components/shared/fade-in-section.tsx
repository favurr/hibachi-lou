"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeInSectionProps = {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  id?: string;
};

export function FadeInSection({
  children,
  y = 40,
  duration = 0.9,
  stagger = 0.08,
  className,
  id,
}: FadeInSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [y, duration, stagger]);

  return (
    <section id={id} className={className}>
      <div ref={contentRef}>{children}</div>
    </section>
  );
}

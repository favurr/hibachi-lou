"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  { id: 1, title: "Truck exterior", hint: "Cream, red, and yellow wrap" },
  { id: 2, title: "Hibachi grill", hint: "Chef at the flatop" },
  { id: 3, title: "Bowl close-up", hint: "Steamed rice, charred protein, onions" },
  { id: 4, title: "Serving line", hint: "Packaging and labels" },
  { id: 5, title: "Event setup", hint: "Catering pop-up" },
  { id: 6, title: "Team", hint: "Truck crew prep" },
];

export default function GalleryPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
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
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Gallery</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            FROM THE TRUCK.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Behind the scenes, food shots, and event setups around Pittsburgh.
          </p>
        </div>

        <div ref={itemsRef} className="mt-16 grid gap-4 md:grid-cols-3">
          {GALLERY.map((item) => (
            <div
              key={item.id}
              className="flex aspect-[4/3] flex-col justify-end rounded-xl border border-border bg-muted p-5"
            >
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

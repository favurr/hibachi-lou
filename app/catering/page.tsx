"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { title: "WEDDINGS", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80" },
  { title: "PRIVATE PARTIES", image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80" },
  { title: "CORPORATE", image: "https://images.unsplash.com/photo-1528604228932-9360a56f0b6a?w=1200&auto=format&fit=crop&q=80" },
  { title: "COMMUNITY EVENTS", image: "https://images.unsplash.com/photo-1511578314322-3792f7984f3c?w=1200&auto=format&fit=crop&q=80" },
];

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CateringPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 24 },
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Catering</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            BRING<br />
            LOU<br />
            TO YOU.
          </h1>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90">
            BOOK HIBACHI LOU →
          </Link>
        </div>
      </div>
    </section>
  );
}

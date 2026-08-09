"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "@/components/public/marquee";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-background overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528604228932-9360a56f0b6a?w=2000&auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/80" />

        <div className="relative mx-auto max-w-6xl px-4 py-32 w-full flex-1 flex items-center">
          <div ref={contentRef} className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-red-700 border border-red-700/20 rounded-full px-4 py-1.5">
                Pittsburgh Hibachi
              </p>
              <h1 className="text-6xl font-bold tracking-tight font-heading text-foreground md:text-8xl leading-[0.88]">
                PITTSBURGH&apos;S<br />
                HIBACHI<br />
                ON WHEELS.
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl leading-relaxed">
                Big flavor, hot grills, and hibachi cooked right in front of you. Catch us around Pittsburgh or bring Hibachi Lou to your next event.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/schedule">
                <Button size="lg" className="h-12 px-8 text-base">
                  FIND THE TRUCK →
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  BOOK LOU →
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Truck</p>
                <p className="text-sm font-medium text-foreground">Pittsburgh, PA</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                <a href="tel:+13136298567" className="text-sm font-medium text-foreground hover:text-primary">
                  (313) 629-8567
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Handle</p>
                <p className="text-sm font-medium text-foreground">@HIBACHILOU412</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}

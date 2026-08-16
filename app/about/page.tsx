"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "450°F", label: "GRIDDLE TEMP" },
  { value: "50K+", label: "PLATES SERVED" },
  { value: "412", label: "PITTSBURGH ROOTED" },
  { value: "100%", label: "MADE TO ORDER" },
];

const TIMELINE = [
  {
    year: "2021",
    title: "THE LATE NIGHT SPARK",
    description: "Born from backyard gatherings, late-night grills, and an obsession with perfect hibachi. Lou started serving friends on a single flat-top griddle.",
  },
  {
    year: "2022",
    title: "ON THE WHEELS",
    description: "Launched the first food truck, hitting the streets of Pittsburgh. From Millvale to the South Side, bringing fire and fresh ingredients to the curbs.",
  },
  {
    year: "2024",
    title: "THE LOCAL STAPLE",
    description: "Expanded to weddings, private corporate catering, and large-scale local festivals. Lou became the standard for interactive, high-energy event dining.",
  },
];

const VALUES = [
  {
    title: "NO SHORTCUTS",
    description: "We don't buy pre-made sauces or frozen shortcuts. Every marinade, yum-yum sauce, and garlic butter is whipped up from scratch.",
  },
  {
    title: "THE OPEN FLAME",
    description: "Cooking at 450°F on the flat-top griddle locks in the sear and keeps veggies crisp. The heat is where the magic lives.",
  },
  {
    title: "STEEL CITY SERVICE",
    description: "No pretension, just honest hospitality. We feed you family-style, straight from the fire, with classic Pittsburgh grit.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".about-hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
      });

      tl.from(
        ".about-stat-card",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // 2. Scroll Trigger reveals for sections
      const revealContainers = gsap.utils.toArray(".reveal-trigger");
      revealContainers.forEach((container: any) => {
        const textElements = container.querySelector(".reveal-text");
        if (textElements && textElements.length > 0) {
          gsap.from(textElements, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // 3. Staggered reveal for timeline items
      if (containerRef.current?.querySelector(".timeline-item")) {
        gsap.from(".timeline-item", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 4. Staggered reveal for values
      if (containerRef.current?.querySelector(".value-card")) {
        gsap.from(".value-card", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 w-full">
        <div className="max-w-4xl space-y-6">
          <p className="about-hero-text text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            OUR STORY
          </p>
          <h1 className="about-hero-text font-heading text-5xl font-bold tracking-tight text-foreground md:text-8xl leading-[0.88] uppercase">
            WE BRING THE FIRE.<br />
            YOU BRING THE APPETITE.
          </h1>
          <p className="about-hero-text text-lg text-muted-foreground md:text-2xl max-w-3xl leading-relaxed">
            Lou is a one-of-a-kind Pittsburgh food truck serving premium Japanese hibachi cooked on an open flame. Every plate is made to order, family style, right in front of you.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 border-t border-border pt-12">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="about-stat-card bg-card border border-border p-6 rounded-xl flex flex-col justify-between aspect-[4/3] md:aspect-square"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
              <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Banner */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1800&auto=format&fit=crop&q=80"
          alt="Flame griddle action"
          fill
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </section>

      {/* The Journey (Timeline) */}
      <section className="timeline-section mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              THE CHRONICLES
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88] uppercase">
              HOW WE<br />
              STARTED.
            </h2>
          </div>

          <div className="space-y-12 border-l border-border pl-6 md:pl-10 ml-2">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="timeline-item relative space-y-4">
                {/* Bullet */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-primary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {item.year}
                </span>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="values-section bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 w-full">
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              OUR BELIEFS
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88] uppercase">
              THE CODE OF<br />
              THE GRIDDLE.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="value-card bg-card border border-border p-8 rounded-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    RULE 0{idx + 1}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {val.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Chef Lou */}
      <section className="reveal-trigger mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&auto=format&fit=crop&q=80"
              alt="Chef Lou at the griddle"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <p className="reveal-text text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              THE MAN BEHIND THE FLAME
            </p>
            <h2 className="reveal-text font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88] uppercase">
              CHEF LOU.
            </h2>
            <p className="reveal-text text-lg text-muted-foreground leading-relaxed">
              If you have been to a street market, wedding party, or late-night run in the burgh, chances are you have seen Lou griddling up prime steak and garlic butter. 
            </p>
            <p className="reveal-text text-lg text-muted-foreground leading-relaxed">
              With over a decade of grill experience and a passion for street hospitality, Lou built the truck from the ground up to ensure everyone gets hot, fast, and top-tier hibachi right off the steel.
            </p>
            <div className="reveal-text pt-4 flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" className="h-12 px-8 text-base">
                  EXPLORE THE MENU
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  BOOK LOU →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative flex flex-col bg-primary text-primary-foreground border-t border-primary/20">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full text-center space-y-8">
          <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88] uppercase">
            READY FOR THE EXPERIENCE?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Catch the truck in your neighborhood or book private catering for your next big event.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/locations">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                FIND THE TRUCK →
              </Button>
            </Link>
            <Link href="/#contact">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                BOOK LATER →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

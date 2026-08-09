"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Marquee } from "@/components/public/marquee";
import SchedulePage from "./schedule/page";

gsap.registerPlugin(ScrollTrigger);

const MENU = [
  {
    id: "01",
    title: "Steak Hibachi",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "02",
    title: "Chicken Hibachi",
    price: "$16",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "03",
    title: "Shrimp Hibachi",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
  },
];

const LOCATIONS = [
  {
    id: "08.16.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.9959,
    lat: 40.4406,
  },
  {
    id: "08.23.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.99,
    lat: 40.44,
  },
  {
    id: "08.30.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.985,
    lat: 40.445,
  },
];

const CATERING_ITEMS = [
  {
    title: "WEDDINGS",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "PRIVATE PARTIES",
    image:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "CORPORATE",
    image:
      "https://images.unsplash.com/photo-1528604228932-9360a56f0b6a?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "COMMUNITY EVENTS",
    image:
      "https://images.unsplash.com/photo-1511578314322-3792f7984f3c?w=1200&auto=format&fit=crop&q=80",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80",
    alt: "Grill shot",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80",
    alt: "Steak",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    alt: "Bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
    alt: "Shrimp",
  },
  {
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80",
    alt: "Event",
  },
];

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
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-background overflow-hidden"
      >
        <div className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/80" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 w-full flex-1 flex items-center">
          <div ref={contentRef} className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-red-700 border border-red-700/20 rounded-full px-4 py-1.5">
                Pittsburgh Hibachi
              </p>
              <h1 className="text-6xl font-bold tracking-tight font-heading text-foreground md:text-8xl leading-[0.88]">
                PITTSBURGH&apos;S
                <br />
                HIBACHI
                <br />
                ON WHEELS.
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl leading-relaxed">
                Big flavor, hot grills, and hibachi cooked right in front of
                you. Catch us around Pittsburgh or bring Hibachi Lou to your
                next event.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="#find-lou">
                <Button size="lg" className="h-12 px-8 text-base">
                  FIND THE TRUCK →
                </Button>
              </Link>
              <Link href="#catering">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  BOOK LOU →
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Truck
                </p>
                <p className="text-sm font-medium text-foreground">
                  Pittsburgh, PA
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Phone
                </p>
                <a
                  href="tel:+13136298567"
                  className="text-sm font-medium text-foreground hover:text-primary"
                >
                  (313) 629-8567
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Handle
                </p>
                <p className="text-sm font-medium text-foreground">
                  @HIBACHILOU412
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="flex flex-1 flex-col bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
                01 / THE LOU EXPERIENCE
              </p>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
                WE BRING
                <br />
                THE GRILL
                <br />
                TO YOU.
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Hibachi Lou isn&apos;t just another food truck. We bring the
                grill, the heat, and the experience straight to the streets of
                Pittsburgh.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80"
                  alt="Hibachi grill"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Menu
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
              WHAT&apos;S
              <br />
              COOKIN&apos;?
            </h1>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {MENU.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground">
                    {item.id}
                  </p>
                  <div className="mt-2 flex items-end justify-between">
                    <h3 className="font-heading text-2xl font-semibold text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xl text-foreground">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-background">
        <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&auto=format&fit=crop&q=80"
              alt="Hibachi experience"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 w-full">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88] text-background">
                  IT&apos;S NOT
                  <br />
                  JUST FOOD.
                  <br />
                  IT&apos;S THE SHOW.
                </h2>
                <p className="text-lg text-background/80 md:text-xl leading-relaxed">
                  Watch the grill, smell the flame, and eat while the show is
                  still happening.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-[0.2em] text-background/90">
                <span>FIRE</span>
                <span>FLAVOR</span>
                <span>FRESH</span>
                <span>412</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SchedulePage />

      <section id="catering" className="flex flex-1 flex-col bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Catering
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
              BRING
              <br />
              LOU
              <br />
              TO YOU.
            </h1>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CATERING_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border"
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              BOOK HIBACHI LOU →
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Social proof
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
              PITTSBURGH
              <br />
              KNOWS WHAT&apos;S UP.
            </h2>
            <div className="mt-6 flex flex-wrap items-baseline gap-6">
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  BEST OF PGH
                </p>
                <p className="font-heading text-3xl font-bold text-foreground">
                  2025
                </p>
              </div>
              <div>
                <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  #1
                </p>
                <p className="font-heading text-3xl font-bold text-foreground">
                  FOOD TRUCK
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">
                &ldquo;Best hibachi I&apos;ve had from a truck. The energy, the
                heat, the flavor.&rdquo;
              </blockquote>
              <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">
                &ldquo;Booked Lou for our company picnic and it was the main
                event.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col bg-background">
        <div className="mx-auto max-w-6xl px-4 py-24 w-full">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            Instagram
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            FOLLOW
            <br />
            THE FLAVOR.
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl border border-border">
              <Image
                src={GALLERY[0].src}
                alt={GALLERY[0].alt}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            {GALLERY.slice(1).map((item, idx) => (
              <div
                key={item.alt}
                className={`overflow-hidden rounded-2xl border border-border ${idx === 0 ? "col-span-2 row-span-1" : ""}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex flex-1 flex-col bg-primary text-cream">
        <div className="mx-auto max-w-6xl px-4 py-32 w-full text-center">
          <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">
            HUNGRY?
          </h2>
          <p className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
            LET&apos;S COOK.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#find-lou"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-8 text-base font-medium text-primary hover:bg-cream/90"
            >
              FIND THE TRUCK →
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-cream px-8 text-base font-medium text-cream hover:bg-cream hover:text-primary"
            >
              BOOK LOU →
            </Link>
          </div>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-cream/70">
            @HIBACHILOU412
            <br />
            PITTSBURGH, PA
          </p>
        </div>
      </section>
    </>
  );
}

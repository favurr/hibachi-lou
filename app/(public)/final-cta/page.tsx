"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative flex flex-1 flex-col bg-primary text-cream">
      <div className="mx-auto max-w-6xl px-4 py-32 w-full text-center">
        <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">HUNGRY?</h2>
        <p className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">LET&apos;S COOK.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/schedule" className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-8 text-base font-medium text-primary hover:bg-cream/90">
            FIND THE TRUCK →
          </Link>
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg border border-cream px-8 text-base font-medium text-cream hover:bg-cream hover:text-primary">
            BOOK LOU →
          </Link>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-cream/70">
          @HIBACHILOU412<br />
          PITTSBURGH, PA
        </p>
      </div>
    </section>
  );
}

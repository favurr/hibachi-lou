"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="relative flex flex-1 flex-col bg-primary text-cream">
      <div className="mx-auto max-w-6xl px-4 py-32 w-full text-center">
        <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">HUNGRY?</h2>
        <p className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">LET&apos;S COOK.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/schedule">FIND THE TRUCK →</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-primary">
            <Link href="/contact">BOOK LOU →</Link>
          </Button>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-cream/70">
          @HIBACHILOU412<br />
          PITTSBURGH, PA
        </p>
      </div>
    </section>
  );
}

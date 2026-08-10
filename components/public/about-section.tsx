import { FadeInSection } from "@/components/shared/fade-in-section";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="bg-background reveal-trigger">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">About</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">HIBACHI LOU.</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Lou is a one-of-a-kind Pittsburgh food truck serving Japanese hibachi cooked on an open flame. Every plate is made to order, family style, right in front of you. No shortcuts, no pre-made sauces.
          </p>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Born from late-night grills and street-side hospitality, the truck became a local staple for weekend parties, weddings, and late runs. Lou handles the menu, the grill, and the cleanup. You just bring the hunger.
          </p>
          <div className="mt-8">
            <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90">
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

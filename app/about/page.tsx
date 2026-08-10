import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <section className="flex flex-1 flex-col bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">About</p>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl leading-[0.88]">HIBACHI LOU.</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Lou is a one-of-a-kind Pittsburgh food truck serving Japanese hibachi cooked on an open flame. Every plate is made to order, family style, right in front of you. No shortcuts, no pre-made sauces.
          </p>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Born from late-night grills and street-side hospitality, the truck became a local staple for weekend parties, weddings, and late runs. Lou handles the menu, the grill, and the cleanup. You just bring the hunger.
          </p>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">
            The menu is built around hibachi classics: steak, chicken, shrimp, vegetables, and fried rice, cooked with garlic, soy, and butter on a 450-degree griddle. Everything is served hot, fast, and with zero pretension.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/">
              <Button size="lg" className="h-12 px-8 text-base">Back to Menu</Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">Book Lou →</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

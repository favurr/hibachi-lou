import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/public/marquee";
import { MenuSection } from "@/components/public/menu-section";
import { ExperienceSection } from "@/components/public/experience-section";
import { LocationsSection } from "@/components/public/locations-section";
import { CateringSection } from "@/components/public/catering-section";
import { SocialProofSection } from "@/components/public/social-proof-section";
import { InstagramSection } from "@/components/public/instagram-section";
import { BookingSection } from "@/components/public/booking-section";
import { GallerySection } from "@/components/public/gallery-section";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-background overflow-hidden">
        <div className="absolute inset-0 bg-background/80 dark:bg-background/80" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 w-full flex-1 flex items-center">
          <div className="max-w-4xl space-y-8">
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
                Big flavor, hot grills, and hibachi cooked right in front of you. Catch us around Pittsburgh or bring Hibachi Lou to your next event.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="#locations">
                <Button size="lg" className="h-12 px-8 text-base">
                  FIND THE TRUCK →
                </Button>
              </Link>
              <Link href="#catering">
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
                <a href="tel:+131****8567" className="text-sm font-medium text-foreground hover:text-primary">
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

      <MenuSection />

      <GallerySection />

      <ExperienceSection />

      <LocationsSection />

      <CateringSection />

      <BookingSection />

      <SocialProofSection />

      <InstagramSection />

      <section className="relative flex flex-1 flex-col bg-primary text-cream">
        <div className="mx-auto max-w-6xl px-4 py-32 w-full text-center">
          <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">HUNGRY?</h2>
          <p className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">LET&apos;S COOK.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#locations" className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-8 text-base font-medium text-primary hover:bg-cream/90">FIND THE TRUCK →</Link>
            <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded-lg border border-cream px-8 text-base font-medium text-cream hover:bg-cream hover:text-primary">BOOK LOU →</Link>
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

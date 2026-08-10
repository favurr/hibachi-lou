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

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-background overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" />
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

      <ExperienceSection />

      <LocationsSection />

      <CateringSection />

      <SocialProofSection />

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
              <blockquote className="border-l-2 font-serif border-primary pl-4 text-lg text-muted-foreground md:text-xl">
                &ldquo;Best hibachi I&apos;ve had from a truck. The energy, the
                heat, the flavor.&rdquo;
              </blockquote>
              <blockquote className="border-l-2 font-serif border-primary pl-4 text-lg text-muted-foreground md:text-xl">
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
                key={idx}
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

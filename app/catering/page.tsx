import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  getCateringPackages,
  getCateringEventTypes,
  getCateringFaqs,
  getCateringGalleryItems,
  getFeaturedCateringTestimonials,
} from "@/lib/dal/catering";
import { CateringForm } from "@/components/public/catering-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Star, Flame, Sparkles, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Hibachi Catering & Private Events | Pittsburgh — Hibachi Lou",
  description:
    "Bring the fire and flavor of a live hibachi grill to your backyard party, wedding, or corporate event in Pittsburgh. Book Chef Lou today.",
};

export default async function CateringPage() {
  const [packages, eventTypes, faqs, galleryItems, testimonials] = await Promise.all([
    getCateringPackages(),
    getCateringEventTypes(),
    getCateringFaqs(),
    getCateringGalleryItems(),
    getFeaturedCateringTestimonials(),
  ]);

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 border-b border-border bg-background overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 w-full relative z-10 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary border border-primary/20 rounded-full px-4 py-1.5 w-fit">
              Pittsburgh Private Catering
            </p>
            <h1 className="font-heading text-6xl font-bold uppercase tracking-tight leading-[0.88] md:text-8xl">
              BRING THE <br />
              GRILL TO <br />
              YOUR EVENT.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-lg">
              Fire, flavor, and the 412. Treat your guests to an interactive private chef experience where dinner becomes the main event. We cook live, entertain, and handle the cleanup.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#booking-flow">
                <Button size="lg" className="h-12 px-8 text-base bg-primary text-cream hover:bg-primary/95">
                  REQUEST CATERING →
                </Button>
              </a>
              <a href="#packages">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  VIEW PACKAGES
                </Button>
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80"
              alt="Live Hibachi grill fire tricks on private backyard party"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 2. EXPERIENCE/VALUE PROPS */}
      <section className="py-24 border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">The Show</p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
              DINNER BECOMES <br />
              PART OF THE SHOW.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              With Hibachi Lou, private catering isn&apos;t just about food on plates. It&apos;s a high-energy experience. Our private chefs cook right in front of your guests, bringing the fire show, interactive tricks, and customized seasonings.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 p-6 rounded-2xl border border-border bg-background">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase">450° Hot Grill</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We sear everything fresh at high temperatures on our mobile griddles: flat-iron steak, jumbo shrimp, and chicken breast tossed in garlic butter.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-border bg-background">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase">Interactive Show</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Volcano onions, egg toss tricks, and sake squirts (optional!). Our chefs bring raw energy, entertainment, and laughs for all ages.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-border bg-background">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase">Zero-Hassle Clean</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We roll in, set up, cook a legendary meal, and completely clean our grill station. No dirty kitchens, no piles of dishes to wash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVENT TYPES */}
      {eventTypes.length > 0 && (
        <section className="py-24 border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Occasions</p>
              <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
                CATERING FOR <br />
                EVERY OCCASION.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventTypes.map((et) => (
                <div key={et.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card">
                  {et.imageUrl && (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={et.imageUrl}
                        alt={et.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-2">
                    <h3 className="font-heading text-xl font-bold uppercase">{et.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{et.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CATERING PACKAGES */}
      {packages.length > 0 && (
        <section id="packages" className="py-24 border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Pricing & Packages</p>
              <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
                CHOOSE YOUR <br />
                EXPERIENCE.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Select from our curated menu tiers. Pricing is transparent, and customized options are always welcome.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border bg-background overflow-hidden flex flex-col justify-between ${
                    pkg.featured ? "border-primary ring-1 ring-primary" : "border-border"
                  }`}
                >
                  <div>
                    {pkg.imageUrl && (
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={pkg.imageUrl}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {pkg.featured && (
                          <span className="absolute top-3 right-3 bg-primary text-cream text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-heading text-2xl font-bold uppercase">{pkg.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                      
                      <div className="border-t border-border pt-4 space-y-2">
                        <p className="text-xs font-mono uppercase text-muted-foreground tracking-wider">What&apos;s Included:</p>
                        <ul className="space-y-1.5">
                          {pkg.menuItems.map((item, idx) => (
                            <li key={idx} className="text-xs text-foreground flex items-start gap-2 leading-relaxed">
                              <span className="text-primary mt-0.5 font-bold shrink-0">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/50 mt-6 space-y-4">
                    <div className="flex items-baseline justify-between pt-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Starting Price</span>
                      <span className="font-mono text-lg font-bold text-foreground">
                        {pkg.priceVisible ? `$${pkg.startingPrice}/guest` : "Quote on Request"}
                      </span>
                    </div>
                    <a href="#booking-flow" className="block w-full">
                      <Button className={`w-full uppercase tracking-wider text-xs font-mono ${
                        pkg.featured ? "bg-primary text-cream hover:bg-primary/95" : "bg-muted text-foreground hover:bg-muted/80"
                      }`}>
                        Request This Package →
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE REQUEST FLOW */}
      <section className="py-24 border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Booking Engine</p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
              REQUEST A QUOTE
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Fill out the steps below to calculate your estimated cost and submit a request to Lou.
            </p>
          </div>

          <CateringForm packages={packages} />
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-24 border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">Process</p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Submit Request", desc: "Submit your preferred date, location, and guest count using our form." },
              { num: "02", title: "Custom Menu Planning", desc: "Lou connects with you directly to lock down proteins, sides, and show time." },
              { num: "03", title: "We Grill & Entertain", desc: "Chef Lou rolls up to your venue, lights the griddle, and sears the meal live." },
              { num: "04", title: "Clean Up & Pack Out", desc: "We completely clean down our grill station, packing up with zero mess left." },
            ].map((step, idx) => (
              <div key={idx} className="space-y-3 relative p-4 rounded-xl">
                <span className="font-mono text-4xl font-bold text-primary/20 block">{step.num}</span>
                <h3 className="font-heading text-lg font-bold uppercase">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      {galleryItems.length > 0 && (
        <section className="py-24 border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Moments</p>
              <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
                WE&apos;VE BROUGHT THE <br />
                GRILL TO THE PARTY.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((gi) => (
                <div key={gi.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted">
                  <Image
                    src={gi.imageUrl}
                    alt={gi.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end">
                    <p className="font-heading text-cream text-lg font-bold uppercase">{gi.title}</p>
                    {gi.hint && <p className="font-mono text-[10px] text-cream/70 uppercase tracking-widest mt-1">{gi.hint}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-24 border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 w-full space-y-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Reviews</p>
              <h2 className="font-heading text-4xl font-bold uppercase leading-[0.88] md:text-6xl">
                WHAT THEY SAY <br />
                ABOUT LOU.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-2xl border border-border bg-background p-6 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground italic leading-relaxed font-sans">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-4">
                    {t.imageUrl && (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-border">
                        <Image src={t.imageUrl} alt={t.author} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-heading font-bold uppercase tracking-wide text-foreground">{t.author}</p>
                      {t.role && <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{t.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FAQS */}
      {faqs.length > 0 && (
        <section className="py-24 border-b border-border bg-background">
          <div className="mx-auto max-w-3xl px-4 w-full space-y-16">
            <div className="space-y-4 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">Answers</p>
              <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">FAQS</h2>
            </div>

            <Accordion className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="font-heading text-base font-semibold py-4 hover:no-underline text-foreground uppercase">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed font-sans">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 10. FINAL CTA */}
      <section className="relative flex flex-1 flex-col bg-primary text-cream">
        <div className="mx-auto max-w-6xl px-4 py-32 w-full text-center space-y-6">
          <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">READY TO BOOK?</h2>
          <p className="mt-4 font-heading text-3xl font-semibold tracking-tight md:text-5xl">LET&apos;S LIGHT THE FIRE.</p>
          <div className="mt-8 flex justify-center">
            <a href="#booking-flow">
              <Button size="lg" className="h-12 px-8 text-base bg-cream text-primary hover:bg-cream/90 transition-colors uppercase tracking-wider font-mono">
                Get Your Quote →
              </Button>
            </a>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
            @HIBACHILOU412
            <br />
            PITTSBURGH, PA
          </p>
        </div>
      </section>
    </div>
  );
}

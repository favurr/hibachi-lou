import Image from "next/image";

export function ExperienceSection() {
  return (
    <section className="relative flex flex-1 flex-col bg-background">
      <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&auto=format&fit=crop&q=80" alt="Hibachi experience" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 w-full">
          <div className="max-w-3xl space-y-8 text-cream">
            <div className="space-y-4">
              <h2 className="font-heading text-5xl font-bold tracking-tight md:text-7xl leading-[0.88]">
                IT&apos;S NOT<br />
                JUST FOOD.<br />
                IT&apos;S THE SHOW.
              </h2>
              <p className="text-lg text-cream/80 md:text-xl leading-relaxed">
                Watch the grill, smell the flame, and eat while the show is still happening.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-[0.2em] text-cream/90">
              <span>FIRE</span>
              <span>FLAVOR</span>
              <span>FRESH</span>
              <span>412</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

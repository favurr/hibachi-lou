export function SocialProofSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Social proof</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            PITTSBURGH<br />
            KNOWS WHAT&apos;S UP.
          </h2>
          <div className="mt-6 flex flex-wrap items-baseline gap-6">
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">BEST OF PGH</p>
              <p className="font-heading text-3xl font-bold text-foreground">2025</p>
            </div>
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">#1</p>
              <p className="font-heading text-3xl font-bold text-foreground">FOOD TRUCK</p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">“Best hibachi I’ve had from a truck. The energy, the heat, the flavor.”</blockquote>
            <blockquote className="border-l-2 border-primary pl-4 text-lg text-muted-foreground md:text-xl">“Booked Lou for our company picnic and it was the main event.”</blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

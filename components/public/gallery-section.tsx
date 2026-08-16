import Link from "next/link";

const GALLERY = [
  { id: 1, title: "Truck exterior", hint: "Cream, red, and yellow wrap" },
  { id: 2, title: "Hibachi grill", hint: "Chef at the flatop" },
  { id: 3, title: "Bowl close-up", hint: "Steamed rice, charred protein, onions" },
  { id: 4, title: "Serving line", hint: "Packaging and labels" },
  { id: 5, title: "Event setup", hint: "Catering pop-up" },
  { id: 6, title: "Team", hint: "Truck crew prep" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-background reveal-trigger">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Gallery</p>
            <h2 className="mt-4 font-heading reveal-text text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">FROM THE TRUCK.</h2>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">Behind the scenes, food shots, and event setups around Pittsburgh.</p>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-foreground hover:text-primary underline underline-offset-4">See More</Link>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {GALLERY.map((item) => (
            <div key={item.id} className="flex aspect-[4/3] flex-col justify-end rounded-xl border border-border bg-muted p-5">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

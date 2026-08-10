import Image from "next/image";

const GALLERY = [
  { id: 1, title: "Truck exterior", hint: "Cream, red, and yellow wrap", src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80" },
  { id: 2, title: "Hibachi grill", hint: "Chef at the flatop", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80" },
  { id: 3, title: "Bowl close-up", hint: "Steamed rice, charred protein, onions", src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80" },
  { id: 4, title: "Serving line", hint: "Packaging and labels", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&auto=format&fit=crop&q=80" },
  { id: 5, title: "Event setup", hint: "Catering pop-up", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80" },
  { id: 6, title: "Team", hint: "Truck crew prep", src: "https://images.unsplash.com/photo-1583394293214-28ez1f1a36d?w=1200&auto=format&fit=crop&q=80" },
];

export default function GalleryPage() {
  return (
    <section className="flex flex-1 flex-col bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Gallery</p>
        <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl leading-[0.88]">FROM THE TRUCK.</h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">Behind the scenes, food shots, and event setups around Pittsburgh.</p>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {GALLERY.map((item) => (
            <div key={item.id} className="relative flex aspect-[4/3] flex-col justify-end rounded-xl border border-border bg-muted p-5">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="absolute inset-0 -z-10 h-full w-full rounded-xl object-cover"
              />
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

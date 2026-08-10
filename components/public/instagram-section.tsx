import Image from "next/image";

const GRID = [
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80", alt: "Grill shot" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80", alt: "Steak" },
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80", alt: "Bowl" },
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80", alt: "Shrimp" },
  { src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1200&auto=format&fit=crop&q=80", alt: "Event" },
];

export function InstagramSection() {
  return (
    <section className="flex flex-1 flex-col bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Instagram</p>
        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
          FOLLOW<br />
          THE FLAVOR.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl border border-border">
            <Image src={GRID[0].src} alt={GRID[0].alt} width={1200} height={900} className="h-full w-full object-cover" />
          </div>
          {GRID.slice(1).map((item, idx) => (
            <div key={item.alt} className={`overflow-hidden rounded-2xl border border-border ${idx === 0 ? "col-span-2 row-span-1" : ""}`}>
              <Image src={item.src} alt={item.alt} width={800} height={600} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const MENU = [
  { id: "01", title: "Steak Hibachi", price: "$18", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80" },
  { id: "02", title: "Chicken Hibachi", price: "$16", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80" },
  { id: "03", title: "Shrimp Hibachi", price: "$18", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80" },
];

export function MenuSection() {
  return (
    <section id="menu" className="flex flex-1 reveal-trigger flex-col bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Menu</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            WHAT&apos;S<br />
            COOKIN&apos;?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {MENU.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs tracking-widest text-muted-foreground">{item.id}</p>
                <div className="mt-2 flex items-end justify-between">
                  <h3 className="font-heading text-2xl font-semibold text-foreground leading-tight">{item.title}</h3>
                  <span className="font-mono text-xl text-foreground">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

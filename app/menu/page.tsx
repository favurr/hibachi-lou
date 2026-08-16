import { getAvailableMenuItems } from "@/lib/dal/menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/public/add-to-cart-button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu — Hibachi Lou",
  description: "Browse Pittsburgh's finest hibachi options, yakisoba noodles, and side boxes.",
};

export default async function MenuPage() {
  const dbItems = await getAvailableMenuItems();

  // Group items by category
  const categories = ["Hibachi", "Noodles", "Sides", "Drinks"];
  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat] = dbItems.filter(item => item.category === cat);
    return acc;
  }, {} as Record<string, typeof dbItems>);

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="mx-auto max-w-6xl space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">On the Griddle</p>
          <h1 className="font-heading text-6xl font-bold uppercase tracking-tight leading-[0.88] text-foreground md:text-8xl">
            OUR MENU
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Every dish is cooked fresh to order with garlic, butter, and Lou's signature soy blend.
          </p>
        </div>

        {dbItems.length === 0 ? (
          <div className="rounded-xl border border-border p-12 text-center text-muted-foreground bg-card space-y-4">
            <p className="text-sm">No items found in the database. Run the seeding script to populate the menu.</p>
            <pre className="inline-block bg-muted p-3 rounded font-mono text-xs text-foreground">
              bun run scratch-seed-menu.ts
            </pre>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((cat) => {
              const items = groupedItems[cat] || [];
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-8">
                  <h3 className="font-heading text-2xl font-bold uppercase border-b border-border pb-3 tracking-wider text-primary">
                    {cat}
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between"
                      >
                        {item.imageUrl && (
                          <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-baseline gap-2">
                              <h4 className="font-heading text-xl font-bold uppercase tracking-tight">{item.name}</h4>
                              <span className="font-mono text-sm font-semibold">${item.price.toFixed(2)}</span>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <div className="pt-4">
                            <AddToCartButton id={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl || undefined} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

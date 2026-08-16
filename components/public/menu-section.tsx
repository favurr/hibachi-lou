import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { getAvailableMenuItems } from "@/lib/dal/menu";
import { AddToCartButton } from "./add-to-cart-button";

const DEFAULT_MENU = [
  {
    id: "01",
    name: "Steak Hibachi",
    price: 18,
    description: "Tender flat-iron steak grilled with soy, garlic, and butter, served over fried rice.",
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "02",
    name: "Chicken Hibachi",
    price: 16,
    description: "Juicy chicken breast seared with garlic butter, served with signature vegetables.",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "03",
    name: "Shrimp Hibachi",
    price: 18,
    description: "Plump pacific shrimp grilled with lemon and garlic, served family-style.",
    imageUrl:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
  },
];

export async function MenuSection() {
  const dbItems = await getAvailableMenuItems();
  
  // Use DB items if present, else fallback to default mock items
  const items = dbItems.length > 0 ? dbItems.map((item, idx) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description || "Freshly cooked to order with signature veggies and rice.",
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&auto=format&fit=crop&q=80",
    index: String(idx + 1).padStart(2, "0")
  })) : DEFAULT_MENU.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    imageUrl: item.imageUrl,
    index: item.id
  }));

  return (
    <section
      id="menu"
      className="flex flex-1 reveal-trigger flex-col bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            Menu
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[0.88]">
            WHAT&apos;S
            <br />
            COOKIN&apos;?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="relative bg-muted/50 mx-auto w-full max-w-sm pt-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 z-30 aspect-video" />
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="relative z-20 aspect-video w-full object-cover rounded-t-xl"
                  unoptimized
                />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured {item.index}</Badge>
                </CardAction>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-none">
                <AddToCartButton id={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

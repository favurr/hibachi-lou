"use client";

import { useCart } from "@/components/shared/cart-context";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const { addToCart } = useCart();

  return (
    <Button
      onClick={() => addToCart({ id, name, price, imageUrl })}
      className="cursor-pointer w-full font-sans uppercase tracking-wider h-10 hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      Add to order — ${price}
    </Button>
  );
}

"use client";

import { useState } from "react";
import { useCart } from "@/components/shared/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (cartCount === 0) return null;

  return (
    <>
      {/* Floating Cart Badge Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-background"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-mono font-bold text-background ring-2 ring-background">
          {cartCount}
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Panel */}
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border p-6 flex flex-col justify-between shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-xl font-bold uppercase text-foreground">Your Order</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Itemized List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 divide-y divide-border">
              {cart.map((item, idx) => (
                <div key={item.id} className={`flex gap-4 items-start ${idx > 0 ? "pt-4" : ""}`}>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-sans font-semibold text-foreground text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors ml-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer summary */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-mono">Subtotal</span>
                <span className="text-xl font-mono font-bold text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes calculated at checkout. Pickup from food truck stop.
              </p>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/order/checkout");
                }}
                className="w-full h-12 uppercase tracking-widest font-semibold"
              >
                PROCEED TO CHECKOUT →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

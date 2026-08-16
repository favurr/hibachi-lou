"use client";

import { useState } from "react";
import { useCart } from "@/components/shared/cart-context";
import { createGuestOrder } from "@/app/actions/orders";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tax = cartTotal * 0.07;
  const finalTotal = cartTotal + tax;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const guestName = (form.elements.namedItem("name") as HTMLInputElement).value;
    const guestPhone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const guestEmail = (form.elements.namedItem("email") as HTMLInputElement).value;
    const pickupTime = (form.elements.namedItem("pickupTime") as HTMLInputElement).value;

    const items = cart.map((i) => ({
      menuItemId: i.id,
      quantity: i.quantity,
    }));

    try {
      const res = await createGuestOrder({
        guestName,
        guestPhone,
        guestEmail,
        pickupTime,
        items,
      });

      if (res.success) {
        clearCart();
        // Redirect to secure tracking url
        router.push(`/order/track/${res.friendlyId}?token=${res.secureToken}`);
      } else {
        setError(res.error || "Failed to place order.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4 space-y-4">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h2 className="font-heading text-2xl font-bold uppercase">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground max-w-sm text-center">
          Go back to the homepage and select items from our menu grid.
        </p>
        <Link href="/">
          <Button>Back to Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* Checkout Details Form */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Guest Checkout</p>
              <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Order Details</h1>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required disabled={loading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (for order ready updates)</Label>
                  <Input id="phone" name="phone" placeholder="(412) 555-0199" required disabled={loading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Receipt Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={loading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time (ASAP / Scheduled Time)</Label>
                  <Input id="pickupTime" name="pickupTime" placeholder="e.g. ASAP or 6:30 PM" required disabled={loading} />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 uppercase tracking-widest font-semibold" disabled={loading}>
                {loading ? "Placing Order..." : `Place Order — $${finalTotal.toFixed(2)} →`}
              </Button>
            </form>
          </div>

          {/* Checkout Summary Card */}
          <div className="rounded-xl border border-border p-6 h-fit bg-card space-y-6">
            <h3 className="font-heading text-xl font-bold uppercase border-b border-border pb-3">Summary</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-mono text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-mono uppercase tracking-wider text-xs">Subtotal</span>
                <span className="font-mono">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-mono uppercase tracking-wider text-xs">PA Food Tax (7%)</span>
                <span className="font-mono">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-border/50 text-base font-bold">
                <span className="uppercase tracking-wider font-mono text-sm">Total</span>
                <span className="font-mono text-lg">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

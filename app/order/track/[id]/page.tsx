import { getOrderBySecureToken } from "@/lib/dal/orders";
import { OrderTrackerClient } from "@/components/public/order-tracker-client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function OrderTrackingPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  // Enforce secure verification check
  const order = token ? await getOrderBySecureToken(id, token) : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4 space-y-6">
        <div className="rounded-full bg-destructive/10 p-4 border border-destructive/20 text-destructive">
          <AlertCircle className="h-10 w-10" />
        </div>
        <div className="text-center space-y-2 max-w-sm">
          <h2 className="font-heading text-2xl font-bold uppercase">Invalid Order Link</h2>
          <p className="text-sm text-muted-foreground">
            This tracking link is invalid, expired, or missing its secure access token.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <OrderTrackerClient
        friendlyId={order.friendlyId}
        secureToken={order.secureToken}
        initialStatus={order.status}
        guestName={order.guestName}
        pickupTime={order.pickupTime || "ASAP"}
        items={order.items}
        totalAmount={order.totalAmount}
      />
    </div>
  );
}

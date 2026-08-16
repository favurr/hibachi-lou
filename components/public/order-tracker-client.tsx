"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "RECEIVED" | "PREPARING" | "COOKING" | "READY" | "COMPLETED" | "CANCELLED";

interface Props {
  friendlyId: string;
  secureToken: string;
  initialStatus: OrderStatus;
  guestName: string;
  pickupTime: string;
  items: any[];
  totalAmount: number;
}

const STATES: OrderStatus[] = ["RECEIVED", "PREPARING", "COOKING", "READY", "COMPLETED"];

export function OrderTrackerClient({
  friendlyId,
  secureToken,
  initialStatus,
  guestName,
  pickupTime,
  items,
  totalAmount,
}: Props) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  useEffect(() => {
    // 1. Subscribe to order-specific broadcast channel using secure token validation string
    const channelName = `order:${friendlyId}_${secureToken}`;
    const channel = supabase.channel(channelName);

    channel
      .on("broadcast", { event: "status-update" }, ({ payload }) => {
        if (payload.status) {
          setStatus(payload.status);
        }
      })
      .subscribe((subStatus) => {
        if (subStatus === "SUBSCRIBED") {
          setRealtimeConnected(true);
        } else {
          setRealtimeConnected(false);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [friendlyId, secureToken]);

  const activeIndex = STATES.indexOf(status);

  return (
    <div className="mx-auto max-w-2xl border border-border bg-card rounded-2xl p-8 space-y-8 relative overflow-hidden shadow-sm">
      {/* Realtime Status Indicator */}
      <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <span className={`inline-block size-1.5 rounded-full ${realtimeConnected ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
        {realtimeConnected ? "Realtime Active" : "Offline"}
      </span>

      <div className="space-y-2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Order status</p>
        <h1 className="font-heading text-5xl font-bold text-foreground uppercase tracking-tight leading-[0.88] text-primary">
          {friendlyId}
        </h1>
        <p className="text-sm text-muted-foreground">
          Keep this page open to track your order in real-time. Show code at the truck on pickup.
        </p>
      </div>

      {/* Progress timeline */}
      <div className="space-y-6">
        <div className="relative flex justify-between items-center w-full">
          {/* Background line */}
          <div className="absolute left-0 right-0 h-0.5 bg-muted z-0" />
          {/* Active progress line fill */}
          <div 
            className="absolute left-0 h-0.5 bg-primary z-0 transition-all duration-500" 
            style={{ width: `${status === "CANCELLED" ? 0 : (activeIndex / (STATES.length - 1)) * 100}%` }}
          />

          {STATES.map((state, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;
            return (
              <div key={state} className="relative z-10 flex flex-col items-center">
                <div className={`size-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                  isCompleted ? "bg-primary border-primary text-cream" :
                  isActive ? "bg-background border-primary text-primary scale-110 shadow" :
                  "bg-muted border-muted text-muted-foreground"
                }`}>
                  {idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 text-center text-[10px] font-mono font-medium text-muted-foreground tracking-wider uppercase">
          {STATES.map((state, idx) => (
            <span key={state} className={idx === activeIndex ? "text-primary font-bold" : ""}>
              {state}
            </span>
          ))}
        </div>
      </div>

      {status === "CANCELLED" && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-center text-destructive font-medium text-sm">
          This order has been cancelled. Please contact staff for details.
        </div>
      )}

      {/* Details Box */}
      <div className="border-t border-border pt-6 space-y-4 text-sm">
        <h3 className="font-heading text-lg font-bold uppercase tracking-tight">Order Details</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Customer</p>
            <p className="font-medium mt-0.5">{guestName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Estimated Pickup</p>
            <p className="font-medium mt-0.5">{pickupTime}</p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span>{item.quantity}x {item.name}</span>
              <span className="font-mono text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-baseline pt-2 border-t border-border/50 text-sm font-bold">
            <span className="uppercase tracking-wider font-mono text-xs">Total paid</span>
            <span className="font-mono text-base text-primary">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

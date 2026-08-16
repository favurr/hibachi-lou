"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "Connecting" | "Connected" | "Disconnected" | "Error";

interface EventLog {
  id: string;
  timestamp: string;
  sender: string;
  message: string;
}

export default function RealtimePocPage() {
  const [status, setStatus] = useState<Status>("Connecting");
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [messageText, setMessageText] = useState("Hello from Supabase Realtime!");
  const [clientId, setClientId] = useState("");
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // Generate a simple unique ID for this browser tab instance
    const id = `client-${Math.random().toString(36).substring(2, 9)}`;
    setClientId(id);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      setStatus("Error");
      console.error("Supabase environment variables are missing.");
      return;
    }

    // 1. Subscribe to Broadcast Channel
    const channel = supabase.channel("hibachi-lou:test");
    channelRef.current = channel;

    channel
      .on("broadcast", { event: "test-message" }, ({ payload }) => {
        setLogs((prev) => [
          {
            id: Math.random().toString(),
            timestamp: new Date().toLocaleTimeString(),
            sender: payload.sender || "unknown",
            message: payload.message || "",
          },
          ...prev,
        ]);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setStatus("Connected");
        } else if (status === "CLOSED") {
          setStatus("Disconnected");
        } else if (status === "CHANNEL_ERROR") {
          setStatus("Error");
        }
      });

    // 2. Cleanup subscription on unmount
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const handleBroadcast = () => {
    const channel = channelRef.current;
    if (!channel || status !== "Connected") return;

    // Send broadcast event client-side to all connected participants
    channel.send({
      type: "broadcast",
      event: "test-message",
      payload: {
        sender: clientId,
        message: messageText,
      },
    });

    // Add it to our local log since client-side broadcast isn't self-reflected by default
    setLogs((prev) => [
      {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        sender: `${clientId} (You)`,
        message: messageText,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="mx-auto max-w-2xl border border-border bg-card rounded-2xl p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Infrastructure verification
          </p>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight">
            REALTIME POC
          </h1>
          <p className="text-sm text-muted-foreground">
            Open this page in two separate browser windows to test real-time broadcast.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/40">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Connection Status</p>
            <p className={`font-semibold text-lg ${
              status === "Connected" ? "text-emerald-600" :
              status === "Connecting" ? "text-amber-500" : "text-destructive"
            }`}>{status}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Client ID</p>
            <p className="font-mono text-sm">{clientId || "initializing..."}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="msg">Broadcast Message</Label>
            <div className="flex gap-3">
              <Input
                id="msg"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Enter test payload..."
                disabled={status !== "Connected"}
              />
              <Button onClick={handleBroadcast} disabled={status !== "Connected"}>
                Broadcast
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold uppercase border-b border-border pb-2">
            Broadcast Log
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-border">
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Waiting for broadcast events...
              </p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="pt-3 text-sm flex justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground mr-2">[{log.timestamp}]</span>
                    <span className="font-semibold text-foreground">{log.sender}: </span>
                    <span className="text-muted-foreground">{log.message}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { FadeInSection } from "@/components/shared/fade-in-section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    setSubmitted(true);
  };
  return (
    <FadeInSection id="contact" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Catering & events</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">BOOK LOU.</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">Tell us about your event. We handle the grill, the menu, and the cleanup.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Event type, date, guest count..." className="min-h-[140px]" />
            </div>
            <button type="submit" className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90">{submitted ? "Received" : "Send Request"}</button>
          </form>

          <div className="space-y-6 rounded-xl border border-border p-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Truck</p>
              <p className="mt-2 font-medium text-foreground">Pittsburgh, PA</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
              <a href="tel:+13136298567" className="mt-2 block font-medium text-foreground hover:text-primary">(313) 629-8567</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Hours</p>
              <p className="mt-2 font-medium text-foreground">Seasonal / by location</p>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitCateringRequest } from "@/app/actions/catering";

export function BookingSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      guestCount: parseInt((form.elements.namedItem("guestCount") as HTMLInputElement).value),
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      startTime: (form.elements.namedItem("startTime") as HTMLInputElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await submitCateringRequest(formData);
      if (res.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(res.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Catering & events</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">BOOK LOU.</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl leading-relaxed">Tell us about your event. We handle the grill, the menu, and the cleanup.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 max-w-3xl">
            {error}
          </div>
        )}

        {submitted && (
          <div className="mt-6 rounded-lg bg-emerald-100/50 p-4 text-sm text-emerald-800 border border-emerald-200 max-w-3xl font-medium">
            Thank you! Your catering inquiry has been received. Lou will reach out within 24 hours.
          </div>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="(412) 555-0199" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  name="eventType"
                  required
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Community Event">Community Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestCount">Estimated Guest Count</Label>
                <Input id="guestCount" name="guestCount" type="number" min="1" placeholder="e.g. 50" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input id="date" name="date" type="date" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" name="startTime" placeholder="e.g. 4:00 PM" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Event Location/Venue</Label>
                <Input id="location" name="location" placeholder="e.g. Homestead, PA" required disabled={loading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message / Special Requests</Label>
              <Textarea id="message" name="message" placeholder="Gluten-free needs, secondary menu options, setup requests..." className="min-h-[120px]" disabled={loading} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Submitting..." : "Send Catering Request →"}
            </button>
          </form>

          <div className="space-y-6 rounded-xl border border-border p-6 h-fit bg-card">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Truck Location Base</p>
              <p className="mt-2 font-medium text-foreground">Pittsburgh, PA</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
              <a href="tel:+14129536101" className="mt-2 block font-medium text-foreground hover:text-primary">(412) 953-6101</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Operating Hours</p>
              <p className="mt-2 font-medium text-foreground">Seasonal / by location stop schedule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

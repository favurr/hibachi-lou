"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitCateringRequest, checkDateAvailability } from "@/app/actions/catering";
import { Calendar, Clock, MapPin, Users, CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, DollarSign } from "lucide-react";

interface CateringPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  startingPrice: number;
  priceVisible: boolean;
  minGuests: number;
}

interface CateringFormProps {
  packages: CateringPackage[];
}

export function CateringForm({ packages }: CateringFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  // Form Fields
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [location, setLocation] = useState("");
  const [guestCount, setGuestCount] = useState(25);
  const [packageSlug, setPackageSlug] = useState(packages[0]?.slug || "");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Availability State
  const [availability, setAvailability] = useState<{
    checked: boolean;
    available: boolean;
    reason: string | null;
  }>({ checked: false, available: true, reason: null });
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Check date availability when date changes
  useEffect(() => {
    if (!date) {
      setAvailability({ checked: false, available: true, reason: null });
      return;
    }

    const verifyDate = async () => {
      setCheckingAvailability(true);
      setError("");
      try {
        const res = await checkDateAvailability(date);
        setAvailability({
          checked: true,
          available: res.available,
          reason: res.reason,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAvailability(false);
      }
    };

    const timer = setTimeout(verifyDate, 400);
    return () => clearTimeout(timer);
  }, [date]);

  // Selected package details
  const selectedPackage = packages.find((p) => p.slug === packageSlug);

  // Calculate live ballpark pricing
  const calculateEstimate = () => {
    if (!selectedPackage) return null;
    if (!selectedPackage.priceVisible) return "Price on Request";
    const total = selectedPackage.startingPrice * guestCount;
    return `$${total.toLocaleString()}`;
  };

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!date || !startTime || !location || !guestCount) {
        setError("Please fill out all event details.");
        return;
      }
      if (guestCount < 1) {
        setError("Guest count must be at least 1.");
        return;
      }
      if (selectedPackage && guestCount < selectedPackage.minGuests) {
        setError(`Minimum guest count for ${selectedPackage.name} is ${selectedPackage.minGuests} guests.`);
        return;
      }
      if (availability.checked && !availability.available) {
        setError("This date is already booked. Please choose an available date.");
        return;
      }
    } else if (step === 2) {
      if (!packageSlug) {
        setError("Please select a catering package.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !phone) {
      setError("Please fill out all contact details.");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      email,
      phone,
      eventType: "Private Catering",
      guestCount: Number(guestCount),
      date,
      startTime,
      location,
      serviceType: selectedPackage?.name || "Classic Catering",
      message,
    };

    try {
      const res = await submitCateringRequest(payload);
      if (res.success) {
        setSuccess(true);
        setRefId(res.referenceId || "CAT-TEMP");
      } else {
        setError(res.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-cream">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Request Received</p>
          <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">WE&apos;VE GOT YOU BOOKED.</h3>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto pt-2">
            Thank you! Your catering inquiry has been saved. Chef Lou will review the details and reach out within 24 hours to confirm your menu.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 inline-block">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Reference ID</p>
          <p className="font-mono text-lg font-bold text-foreground mt-1 uppercase tracking-widest">{refId}</p>
        </div>
        <div className="pt-4 border-t border-border/50 text-xs font-mono text-muted-foreground">
          Need immediate support? Call us at <a href="tel:+14129536101" className="text-primary hover:underline font-bold">(412) 953-6101</a>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-flow" className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start max-w-6xl mx-auto">
      {/* Dynamic Multi-Step Form Wrapper */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        {/* Form Header with Progress indicator */}
        <div className="flex items-center justify-between border-b border-border pb-6 mb-6">
          <div className="space-y-1">
            <h3 className="font-heading text-2xl font-bold uppercase">Catering Inquiry</h3>
            <p className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
              Step {step} of 3
            </p>
          </div>
          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  step >= num ? "bg-primary scale-110" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: EVENT DETAILS */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {/* Inline Date Availability Feedback */}
                  {date && (
                    <div className="text-xs mt-1.5 transition-all">
                      {checkingAvailability ? (
                        <p className="text-muted-foreground flex items-center gap-1.5 animate-pulse">
                          Checking availability...
                        </p>
                      ) : availability.checked ? (
                        availability.available ? (
                          <p className="text-emerald-700 font-medium flex items-center gap-1">
                            ● DATE AVAILABLE
                          </p>
                        ) : (
                          <p className="text-destructive font-medium flex items-center gap-1">
                            ✕ {availability.reason}
                          </p>
                        )
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Input
                      id="startTime"
                      placeholder="e.g. 4:00 PM"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                    <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location/Venue</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      placeholder="e.g. Pleasant Hills, PA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestCount">Estimated Guest Count</Label>
                  <div className="relative">
                    <Input
                      id="guestCount"
                      type="number"
                      min="1"
                      placeholder="e.g. 25"
                      value={guestCount || ""}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      required
                    />
                    <Users className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE / PACKAGE SELECTION */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-3">
                <Label>Choose Catering Package</Label>
                <div className="grid gap-4">
                  {packages.map((pkg) => (
                    <label
                      key={pkg.slug}
                      onClick={() => setPackageSlug(pkg.slug)}
                      className={`relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer bg-background hover:border-primary/50 ${
                        packageSlug === pkg.slug
                          ? "border-primary ring-1 ring-primary"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-lg font-bold uppercase">{pkg.name}</span>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {pkg.priceVisible ? `$${pkg.startingPrice}/guest` : "Contact for Quote"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {pkg.description}
                      </p>
                      <input
                        type="radio"
                        name="package"
                        value={pkg.slug}
                        checked={packageSlug === pkg.slug}
                        onChange={() => {}}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Special Requests / Dietary Restrictions</Label>
                <Textarea
                  id="message"
                  placeholder="e.g. Gluten-free preferences, secondary protein choices, setup constraints..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT INFORMATION */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(412) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="flex items-center gap-1.5"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 bg-primary text-cream hover:bg-primary/95"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 bg-primary text-cream hover:bg-primary/95"
              >
                {loading ? "Submitting..." : "Send Request →"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Estimates & Contact Info Sidebar */}
      <div className="space-y-6">
        {/* Estimator Box */}
        <div className="rounded-2xl border border-border p-6 bg-card space-y-6">
          <div className="border-b border-border pb-4">
            <h4 className="font-heading text-lg font-bold uppercase tracking-tight flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Cost Estimator
            </h4>
            <p className="text-xs text-muted-foreground mt-1">Live ballpark estimation based on parameters</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Selected Package</span>
              <span className="text-sm font-bold text-foreground font-heading uppercase">
                {selectedPackage?.name || "None"}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Guest Count</span>
              <span className="font-mono text-sm">{guestCount} guests</span>
            </div>

            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-base font-semibold">Ballpark Estimate</span>
              <span className="font-mono text-xl font-bold text-primary">
                {calculateEstimate()}
              </span>
            </div>

            {selectedPackage?.priceVisible && (
              <p className="text-[10px] text-muted-foreground leading-normal italic text-center pt-2">
                *Estimate excludes taxes and travel fees. A custom final invoice will be created for you.
              </p>
            )}
          </div>
        </div>

        {/* Truck Location & Contact Info */}
        <div className="rounded-2xl border border-border p-6 bg-card space-y-4 text-sm">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Truck Location Base</p>
            <p className="mt-1 font-semibold text-foreground">Pittsburgh, PA</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Phone</p>
            <a href="tel:+14129536101" className="mt-1 block font-semibold text-foreground hover:text-primary transition-colors">
              (412) 953-6101
            </a>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Operating Hours</p>
            <p className="mt-1 font-semibold text-foreground">By booking / stop schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const LOCATIONS = [
  {
    id: "08.16.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    map: "https://www.google.com/maps?q=Pittsburgh,+PA",
  },
  {
    id: "08.23.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    map: "https://www.google.com/maps?q=Pittsburgh,+PA",
  },
  {
    id: "08.30.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    map: "https://www.google.com/maps?q=Pittsburgh,+PA",
  },
];

const FILTERS = ["ALL", "THIS WEEK", "THIS MONTH"];

export default function SchedulePage() {
  const [active, setActive] = useState("ALL");

  return (
    <section className="flex flex-1 flex-col bg-primary text-cream">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/70">Where to find Lou</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl leading-[0.88]">
            WHERE&apos;S<br />
            LOU?
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f ? "bg-cream text-primary" : "border border-cream/30 text-cream hover:bg-cream/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <div key={loc.id} className="rounded-2xl border border-cream/20 p-6">
              <p className="font-mono text-sm tracking-widest text-cream/80">{loc.id}</p>
              <p className="mt-2 font-mono text-sm uppercase tracking-widest">{loc.day}</p>
              <p className="mt-1 font-mono text-sm text-cream/80">{loc.time}</p>
              <p className="mt-1 font-heading text-xl font-semibold">{loc.place}</p>
              <a
                href={loc.map}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-medium underline underline-offset-4"
              >
                GET DIRECTIONS →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";

const LOCATIONS = [
  {
    id: "08.16.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.9959,
    lat: 40.4406,
  },
  {
    id: "08.23.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.99,
    lat: 40.44,
  },
  {
    id: "08.30.26",
    day: "Saturday",
    time: "12:00 PM — 7:00 PM",
    place: "Pittsburgh, PA",
    lng: -79.985,
    lat: 40.445,
  },
];

const FILTERS = ["ALL", "THIS WEEK", "THIS MONTH"];

export default function SchedulePage() {
  const [active, setActive] = useState("ALL");

  return (
    <section className="flex flex-1 flex-col bg-primary text-black">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/70">Where to find Lou</p>
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
                active === f ? "bg-black text-primary" : "border border-black/30 text-black hover:bg-black/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 h-105 w-full overflow-hidden rounded-2xl border border-black/20">
            <Map center={[-79.9959, 40.4406]} zoom={13}>
              <MapControls />
              {LOCATIONS.map((loc) => (
                <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
                  <MarkerContent>
                    <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
                  </MarkerContent>
                  <MarkerPopup>
                    <div className="space-y-1">
                      <p className="font-heading font-semibold text-foreground">{loc.place}</p>
                      <p className="font-mono text-xs text-muted-foreground">{loc.id} • {loc.day}</p>
                      <p className="font-mono text-xs text-muted-foreground">{loc.time}</p>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}
            </Map>
          </div>

          <div className="space-y-4">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="rounded-2xl border border-black/20 p-5">
                <p className="font-mono text-sm tracking-widest text-black/80">{loc.id}</p>
                <p className="mt-2 font-mono text-sm uppercase tracking-widest">{loc.day}</p>
                <p className="mt-1 font-mono text-sm text-black/80">{loc.time}</p>
                <p className="mt-1 font-heading text-xl font-semibold">{loc.place}</p>
                <a
                  href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
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
      </div>
    </section>
  );
}

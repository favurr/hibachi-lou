import { Map as MapMap, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";
import { getPublishedLocations } from "@/lib/dal/locations";

const DEFAULT_LOCATIONS = [
  { id: "08.16.26", day: "Saturday", time: "12:00 PM — 7:00 PM", place: "Pittsburgh, PA", lng: -79.9959, lat: 40.4406 },
  { id: "08.23.26", day: "Saturday", time: "12:00 PM — 7:00 PM", place: "Pittsburgh, PA", lng: -79.99, lat: 40.44 },
  { id: "08.30.26", day: "Saturday", time: "12:00 PM — 7:00 PM", place: "Pittsburgh, PA", lng: -79.985, lat: 40.445 },
];

export async function LocationsSection() {
  const dbLocations = await getPublishedLocations();

  const locations = dbLocations.length > 0 ? dbLocations.map(loc => {
    const d = new Date(loc.date);
    return {
      id: d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }),
      day: d.toLocaleDateString("en-US", { weekday: "long" }),
      time: `${loc.startTime} — ${loc.endTime}`,
      place: loc.venue,
      lng: -79.9959, // default center mock
      lat: 40.4406   // default center mock
    };
  }) : DEFAULT_LOCATIONS;

  const mapCenter = locations.length > 0 ? [locations[0].lng, locations[0].lat] as [number, number] : [-79.9959, 40.4406] as [number, number];

  return (
    <section id="locations" className="flex flex-1 flex-col bg-primary text-black">
      <div className="mx-auto max-w-6xl px-4 py-24 w-full">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/70">Where to find Lou</p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl leading-[0.88]">
            WHERE&apos;S<br />
            LOU?
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 h-105 w-full overflow-hidden rounded-2xl border border-black/20">
            <MapMap center={mapCenter} zoom={13}>
              <MapControls />
              {locations.map((loc) => (
                <MapMarker key={loc.id + loc.place} longitude={loc.lng} latitude={loc.lat}>
                  <MarkerContent>
                    <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
                  </MarkerContent>
                  <MapControls />
                  <MarkerPopup>
                    <div className="space-y-1">
                      <p className="font-heading font-semibold text-foreground">{loc.place}</p>
                      <p className="font-mono text-xs text-muted-foreground">{loc.id} • {loc.day}</p>
                      <p className="font-mono text-xs text-muted-foreground">{loc.time}</p>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}
            </MapMap>
          </div>

          <div className="space-y-4">
            {locations.map((loc) => (
              <div key={loc.id + loc.place} className="rounded-2xl border border-black/20 p-5">
                <p className="font-mono text-sm tracking-widest text-black/80">{loc.id}</p>
                <p className="mt-2 font-mono text-sm uppercase tracking-widest">{loc.day}</p>
                <p className="mt-1 font-mono text-sm text-black/80">{loc.time}</p>
                <p className="mt-1 font-heading text-xl font-semibold">{loc.place}</p>
                <a href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-medium underline underline-offset-4">GET DIRECTIONS →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

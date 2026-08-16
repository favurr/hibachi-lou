"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapControls, Map as MapMap, MapMarker, MapRoute, MarkerContent, MarkerPopup, useMap } from "@/components/ui/map";
import { ArrowLeft, Clock, Compass, EyeOff, Info, Loader2, MapPin, Navigation, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface LocationItem {
  id: string;
  slug: string | null;
  venue: string;
  address: string | null;
  date: Date;
  startTime: string;
  endTime: string;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  visibility: string;
  status: string;
  menuId: string | null;
  notes: string | null;
}

interface Props {
  initialLocations: LocationItem[];
}

function MapController({ center, zoom }: { center: [number, number] | null; zoom: number }) {
  const { map } = useMap();

  useEffect(() => {
    if (map && center) {
      map.flyTo({
        center,
        zoom,
        essential: true,
        duration: 1200,
      });
    }
  }, [map, center, zoom]);

  return null;
}

export function LocationsInteractive({ initialLocations }: Props) {
  const [filter, setFilter] = useState<"ALL" | "TODAY" | "WEEK">("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-79.9959, 40.4406]);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const scheduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ── Directions State ───────────────────────────────────────────────────
  const [directionsActive, setDirectionsActive] = useState(false);
  const [targetDest, setTargetDest] = useState<LocationItem | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [startQuery, setStartQuery] = useState("");
  const [startResults, setStartResults] = useState<any[]>([]);
  const [loadingStart, setLoadingStart] = useState(false);
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [directionsError, setDirectionsError] = useState("");

  const today = new Date();
  const todayStr = today.toDateString();

  const isToday = (d: Date) => new Date(d).toDateString() === todayStr;
  const isThisWeek = (d: Date) => {
    const date = new Date(d);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date >= startOfWeek && date <= endOfWeek;
  };

  const filteredLocations = initialLocations.filter((loc) => {
    const locDate = new Date(loc.date);
    if (filter === "TODAY") return isToday(locDate);
    if (filter === "WEEK") return isThisWeek(locDate);
    return true;
  });

  const todayStop = initialLocations.find((loc) => isToday(new Date(loc.date)) && loc.visibility === "PUBLIC");

  const getOperationalState = (loc: LocationItem) => {
    if (loc.status === "CANCELLED") {
      return { label: "CANCELLED", color: "bg-zinc-500 text-cream" };
    }
    if (loc.visibility === "PRIVATE") {
      return { label: "PRIVATE EVENT", color: "bg-amber-600 text-cream" };
    }

    const todayDate = new Date();
    if (isToday(new Date(loc.date))) {
      const [startHour, startMin] = loc.startTime.split(":");
      const [endHour, endMin] = loc.endTime.split(":");
      const start = new Date();
      start.setHours(parseInt(startHour), parseInt(startMin || "0"), 0);
      const end = new Date();
      end.setHours(parseInt(endHour), parseInt(endMin || "0"), 0);

      if (todayDate >= start && todayDate <= end) {
        return { label: "OPEN NOW", color: "bg-emerald-600 text-cream animate-pulse" };
      } else if (todayDate < start) {
        return { label: `TODAY Starts at ${loc.startTime}`, color: "bg-blue-600 text-cream" };
      } else {
        return { label: "STOP HAS ENDED", color: "bg-zinc-700 text-zinc-400" };
      }
    }

    const d = new Date(loc.date);
    const formatted = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return { label: `COMING UP: ${formatted}`, color: "bg-neutral-800 text-muted-foreground" };
  };

  const handleSelectStop = (loc: LocationItem) => {
    setSelectedId(loc.id);
    if (loc.longitude && loc.latitude && loc.visibility === "PUBLIC") {
      setMapCenter([loc.longitude, loc.latitude]);
      setMapZoom(14);
    }
    scheduleRefs.current[loc.id]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const handleStartDirections = (loc: LocationItem) => {
    setTargetDest(loc);
    setDirectionsActive(true);
    setRouteCoords(null);
    setDistance(null);
    setDuration(null);
    setStartCoords(null);
    setStartQuery("");
    setStartResults([]);
    setDirectionsError("");
  };

  // Fetch routing coordinates from OSRM
  // Takes destination explicitly to avoid stale closure over targetDest state
  const fetchRoute = async (start: [number, number], dest: LocationItem) => {
    if (!dest.longitude || !dest.latitude) {
      setDirectionsError("This location doesn't have map coordinates yet. Use Google Maps instead.");
      setLoadingRoute(false);
      return;
    }
    setLoadingRoute(true);
    setDirectionsError("");

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) {
        throw new Error("Routing failed");
      }
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords: [number, number][] = route.geometry.coordinates;
        setRouteCoords(coords);
        
        // Convert distance (meters -> miles) and duration (seconds -> minutes)
        const miles = (route.distance / 1609.34).toFixed(1);
        const mins = Math.round(route.duration / 60);
        setDistance(`${miles} mi`);
        setDuration(`${mins} min`);

        // Center map to fit route
        setMapCenter([(start[0] + dest.longitude) / 2, (start[1] + dest.latitude) / 2]);
        setMapZoom(11);
      } else {
        setDirectionsError("Could not calculate a route to this destination.");
      }
    } catch (e: any) {
      if (e.name === "TimeoutError") {
        setDirectionsError("Route request timed out. Try again or use Google Maps.");
      } else {
        setDirectionsError("Route calculation failed. Check connection or try another start point.");
      }
    } finally {
      setLoadingRoute(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!targetDest) return;
    if (!("geolocation" in navigator)) {
      setDirectionsError("Geolocation not supported by this browser.");
      return;
    }
    setLoadingRoute(true);
    setDirectionsError("");

    const dest = targetDest; // capture current value before async callback
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        setStartCoords(coords);
        fetchRoute(coords, dest);
      },
      () => {
        setDirectionsError("Unable to access location. Enter an address instead.");
        setLoadingRoute(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Search autocomplete starting address
  useEffect(() => {
    if (startQuery.length < 3) {
      setStartResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoadingStart(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(startQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setStartResults(data);
        }
      } catch (e) {
        console.error("Autocomplete fetch error:", e);
      } finally {
        setLoadingStart(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [startQuery]);

  const handleSelectStartPoint = (item: any) => {
    if (!targetDest) return;
    const coords: [number, number] = [item.longitude, item.latitude];
    setStartCoords(coords);
    setStartQuery(item.name);
    setStartResults([]);
    fetchRoute(coords, targetDest);
  };

  const handleCloseDirections = () => {
    setDirectionsActive(false);
    setTargetDest(null);
    setRouteCoords(null);
    setDistance(null);
    setDuration(null);
    setStartCoords(null);
    setDirectionsError("");
  };

  return (
    <div className="space-y-8">
      {/* Today's Location Prominent Panel */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Status Today</h2>
        {todayStop ? (
          <div className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded ${getOperationalState(todayStop).color}`}>
                  {getOperationalState(todayStop).label}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{todayStop.startTime} — {todayStop.endTime}</span>
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase text-foreground">{todayStop.venue}</h3>
              {todayStop.address && (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" /> {todayStop.address}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Link href={`/menu?locationId=${todayStop.id}`} className="flex-1 md:flex-none">
                <Button className="w-full uppercase font-mono tracking-wider h-11">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Order Now
                </Button>
              </Link>
              <Button
                onClick={() => handleStartDirections(todayStop)}
                variant="outline"
                className="flex-1 md:flex-none w-full uppercase font-mono tracking-wider h-11 border-border bg-transparent text-foreground hover:bg-muted"
              >
                <Navigation className="h-4 w-4 mr-2" /> Get Directions
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card/50 p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
            <Info className="h-8 w-8 text-muted-foreground/60" />
            <p className="font-mono text-sm uppercase tracking-wider">No Public Stops Today</p>
            <p className="text-xs max-w-xs text-muted-foreground/80">
              Check the upcoming stops calendar below to see where Lou is serving next.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Schedule & Map Coordination Split */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        
        {/* Left Column: Filters & Schedule or Directions Inputs */}
        <div className="space-y-6 flex flex-col">
          {directionsActive && targetDest ? (
            // Directions Panel
            <div className="space-y-6 rounded-2xl border border-border p-6 bg-card">
              <button 
                onClick={handleCloseDirections}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Schedule
              </button>

              <div className="space-y-2">
                <p className="font-mono text-xs uppercase text-primary">Destination</p>
                <h4 className="font-heading text-2xl font-bold uppercase tracking-tight">{targetDest.venue}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {targetDest.address}</p>
              </div>

              {directionsError && (
                <div className="space-y-2">
                  <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive border border-destructive/20 font-medium">
                    {directionsError}
                  </div>
                  {targetDest.address && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(targetDest.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="w-full text-xs font-mono uppercase h-8 border-border bg-transparent text-foreground hover:bg-muted">
                        Open in Google Maps Instead
                      </Button>
                    </a>
                  )}
                </div>
              )}

              {/* Input for Starting Point */}
              <div className="space-y-4 pt-2 border-t border-border/50">
                <p className="font-mono text-xs uppercase text-foreground/80">Starting point</p>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleUseMyLocation}
                    variant="outline" 
                    size="sm" 
                    className="h-9 text-xs font-mono border-border bg-transparent hover:bg-muted"
                  >
                    <Compass className="h-3.5 w-3.5 mr-1.5" /> Use My Location
                  </Button>
                </div>

                <div className="relative">
                  <Input 
                    placeholder="Enter starting address..." 
                    value={startQuery}
                    onChange={(e) => setStartQuery(e.target.value)}
                    className="h-10 text-sm border-border bg-transparent focus-visible:ring-1"
                  />
                  {loadingStart && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  {startResults.length > 0 && (
                    <div className="absolute top-11 left-0 right-0 z-30 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-border/50">
                      {startResults.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectStartPoint(item)}
                          className="p-3 text-xs text-foreground hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Route Summary */}
              {routeCoords && distance && duration && (
                <div className="bg-primary/5 rounded-xl border border-primary/10 p-4 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-heading text-lg font-bold text-foreground">Estimated Time</span>
                    <span className="font-mono text-xl font-bold text-primary">{duration}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>Driving distance</span>
                    <span>{distance}</span>
                  </div>
                  {targetDest.address && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(targetDest.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block pt-2"
                    >
                      <Button variant="outline" size="sm" className="w-full text-xs font-mono uppercase h-8 border-border bg-transparent text-foreground hover:bg-muted">
                        Open in Google Maps
                      </Button>
                    </a>
                  )}
                </div>
              )}

              {loadingRoute && (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          ) : (
            // Normal Schedule List
            <div className="space-y-6 flex flex-col">
              <div className="flex gap-2 border-b border-border/50 pb-4">
                {(["ALL", "TODAY", "WEEK"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`font-mono text-xs font-semibold px-4 py-2 border rounded-full transition-all cursor-pointer ${
                      filter === t
                        ? "bg-primary border-primary text-cream"
                        : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Natural flow container: NO FIXED max-h / overflow-y, resolving nested scrollbars */}
              <div className="space-y-4 divide-y divide-border/40">
                {filteredLocations.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8">No scheduled events match this filter.</p>
                ) : (
                  filteredLocations.map((loc) => {
                    const dateObj = new Date(loc.date);
                    const isPrivate = loc.visibility === "PRIVATE";
                    const isCancelled = loc.status === "CANCELLED";
                    const activeState = getOperationalState(loc);

                    return (
                      <div
                        key={loc.id}
                        ref={(el) => {
                          scheduleRefs.current[loc.id] = el;
                        }}
                        onClick={() => handleSelectStop(loc)}
                        className={`group cursor-pointer p-4 rounded-xl border transition-all flex justify-between items-start gap-4 ${
                          selectedId === loc.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-transparent hover:bg-muted/30"
                        } ${loc.id === todayStop?.id ? "bg-primary/2" : ""}`}
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                              {dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })}
                            </span>
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${activeState.color}`}>
                              {activeState.label}
                            </span>
                          </div>

                          {isPrivate ? (
                            <div>
                              <h4 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground/80 flex items-center gap-1.5">
                                <EyeOff className="h-4 w-4 text-amber-600 shrink-0" /> Private Booking
                              </h4>
                              <p className="text-xs text-muted-foreground">Event details are private.</p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <h4 className="font-heading text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                                {loc.venue}
                              </h4>
                              {loc.address && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3 shrink-0" /> {loc.address}
                                </p>
                              )}
                              <p className="text-[11px] font-mono text-foreground/80 flex items-center gap-1">
                                <Clock className="h-3 w-3 shrink-0" /> {loc.startTime} — {loc.endTime}
                              </p>
                            </div>
                          )}
                        </div>

                        {!isPrivate && !isCancelled && (
                          <div className="flex flex-col gap-1.5 shrink-0 align-end">
                            <Link href={`/menu?locationId=${loc.id}`}>
                              <Button size="sm" className="w-full text-[10px] uppercase font-mono tracking-wider h-8">
                                Order
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartDirections(loc);
                              }}
                              className="w-full text-[10px] uppercase font-mono tracking-wider h-8 bg-transparent text-foreground hover:bg-muted border-border"
                            >
                              Get Directions
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: mapcn Map Component with Lenis prevent attribute */}
        <div 
          data-lenis-prevent
          className="relative h-112.5 lg:h-125 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/30"
        >
            <MapMap
              center={mapCenter}
              zoom={mapZoom}
              theme="dark"
            >
              <MapControls />
              <MapController center={mapCenter} zoom={mapZoom} />

              {/* Render directions route if present */}
              {routeCoords && (
                <MapRoute 
                  coordinates={routeCoords} 
                  color="#3b82f6"
                  width={4} 
                  opacity={0.9}
                  
                />
              )}

              {/* Loop and render public markers only */}
              {filteredLocations
                .filter((loc) => loc.longitude && loc.latitude && loc.visibility === "PUBLIC")
                .map((loc) => {
                  const isActive = loc.id === todayStop?.id;
                  const isSelected = loc.id === selectedId;

                  return (
                    <MapMarker
                      key={loc.id}
                      longitude={loc.longitude!}
                      latitude={loc.latitude!}
                      onClick={() => handleSelectStop(loc)}
                    >
                      <MarkerContent>
                        <div 
                          className={`relative flex items-center justify-center cursor-pointer transition-all ${
                            isSelected ? "scale-125" : "hover:scale-110"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-primary/45 opacity-75" />
                          )}
                          <div 
                            className={`h-4 w-4 rounded-full border-2 border-cream shadow-md transition-colors ${
                              isActive ? "bg-primary" : "bg-neutral-800"
                            }`} 
                          />
                        </div>
                      </MarkerContent>
                      <MarkerPopup>
                        <div className="space-y-1.5 p-1 min-w-[180px]">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${getOperationalState(loc).color}`}>
                              {getOperationalState(loc).label}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-foreground text-sm uppercase leading-none tracking-tight">{loc.venue}</h4>
                          <p className="font-mono text-[9px] text-muted-foreground leading-none">{loc.startTime} - {loc.endTime}</p>
                          <div className="flex gap-2 pt-1">
                            <Link href={`/menu?locationId=${loc.id}`} className="flex-1">
                              <Button size="xs" className="w-full text-[9px] uppercase font-mono tracking-wider h-6">Order</Button>
                            </Link>
                            <Button 
                              size="xs" 
                              variant="outline" 
                              onClick={() => handleStartDirections(loc)}
                              className="flex-1 text-[9px] uppercase font-mono tracking-wider h-6 border-border text-foreground hover:bg-muted"
                            >
                              Get Directions
                            </Button>
                          </div>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  );
                })}
            </MapMap>
        </div>
      </div>
    </div>
  );
}

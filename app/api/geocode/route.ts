import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=us&limit=5`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Hibachi-Lou-App/1.0 (contact@hibachilou.com)",
      },
    });

    if (!res.ok) {
      throw new Error(`Nominatim returned status ${res.status}`);
    }

    const data = await res.json();
    const results = data.map((item: any) => ({
      name: item.display_name,
      address: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      placeId: item.place_id ? String(item.place_id) : undefined,
    }));

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Geocoding proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch geocoding data" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get("debug");
  // IMPORTANT: Only use a server key (no HTTP referrer restriction). Do not fall back to NEXT_PUBLIC_*.
  const key = process.env.GOOGLE_PLACES_SERVER_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!key) {
    return NextResponse.json({ error: "Missing GOOGLE_PLACES_SERVER_KEY (must be a server key without HTTP referrer restriction, restricted to Places API)." }, { status: 500 });
  }
  if (!placeId) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_GOOGLE_PLACE_ID." }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&language=en&key=${key}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();

    if (debug) {
      return NextResponse.json({ raw: data, usedKey: "GOOGLE_PLACES_SERVER_KEY", placeId }, { status: 200 });
    }
    if (data?.status && data.status !== "OK") {
      return NextResponse.json({ error: data.status, details: data }, { status: 502 });
    }
    return NextResponse.json(data?.result || {});
  } catch (e) {
    return NextResponse.json({ error: "Upstream fetch failed", details: String(e) }, { status: 502 });
  }
}

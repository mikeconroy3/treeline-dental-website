import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get("debug");
  const key = process.env.GOOGLE_PLACES_SERVER_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    const msg = "Missing Google Places configuration (API key or Place ID).";
    console.error("[/api/reviews] CONFIG ERROR:", { hasKey: !!key, hasPlaceId: !!placeId });
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${key}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();

    if (debug) {
      return NextResponse.json({ raw: data, usedKey: !!key, placeId }, { status: 200 });
    }
    if (data?.status && data.status !== "OK") {
      console.error("[/api/reviews] GOOGLE ERROR:", data);
      return NextResponse.json({ error: data.status, details: data }, { status: 502 });
    }
    return NextResponse.json(data?.result || {});
  } catch (e) {
    console.error("[/api/reviews] FETCH ERROR:", e);
    return NextResponse.json({ error: "Upstream fetch failed", details: String(e) }, { status: 502 });
  }
}

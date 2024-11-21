import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/config";

export const runtime = "edge";

// Simple in-memory cache
let cache = {
  data: null,
  lastFetched: 0,
};

export async function GET() {
  try {
    const now = Date.now();

    // Return cached data if valid
    if (cache.data && now - cache.lastFetched < CONFIG.CACHE_DURATION * 1000) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control": `public, s-maxage=${
            CONFIG.CACHE_DURATION
          }, stale-while-revalidate=${CONFIG.CACHE_DURATION * 2}`,
          "CDN-Cache-Control": `public, s-maxage=${CONFIG.CACHE_DURATION}`,
          "Vercel-CDN-Cache-Control": `public, s-maxage=${CONFIG.CACHE_DURATION}`,
        },
      });
    }

    // Fetch new data
    const res = await fetch(
      "https://api.plancke.io/hypixel/v1/punishmentStats",
      {
        next: { revalidate: CONFIG.CACHE_DURATION },
      }
    );

    const data = await res.json();

    // Update cache
    cache = {
      data,
      lastFetched: now,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${
          CONFIG.CACHE_DURATION
        }, stale-while-revalidate=${CONFIG.CACHE_DURATION * 2}`,
        "CDN-Cache-Control": `public, s-maxage=${CONFIG.CACHE_DURATION}`,
        "Vercel-CDN-Cache-Control": `public, s-maxage=${CONFIG.CACHE_DURATION}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

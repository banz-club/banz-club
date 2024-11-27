import { type BanStats, BanStatsSchema } from "@/interfaces/bans";

export async function fetchBanStats(): Promise<BanStats> {
  try {
    const res = await fetch(
      "https://api.plancke.io/hypixel/v1/punishmentStats"
    );
    const data = await res.json();
    return BanStatsSchema.parse(data);
  } catch {
    return BanStatsSchema.parse({});
  }
}

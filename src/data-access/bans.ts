import axios from 'axios';

import { type BanStats, BanStatsSchema } from '@/interfaces/bans';

export async function fetchBanStats(): Promise<BanStats> {
  try {
    const { data } = await axios.get(
      'https://api.plancke.io/hypixel/v1/punishmentStats'
    );
    return BanStatsSchema.parse(data);
  } catch {
    return BanStatsSchema.parse({});
  }
}

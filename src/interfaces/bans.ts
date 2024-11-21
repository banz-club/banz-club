import { z } from "zod";

export const BanStatsSchema = z.object({
  success: z.boolean(),
  record: z.object({
    watchdog_lastMinute: z.number(),
    staff_rollingDaily: z.number(),
    watchdog_total: z.number(),
    watchdog_rollingDaily: z.number(),
    staff_total: z.number(),
  }),
});

export type BanStats = z.infer<typeof BanStatsSchema>;

export interface HistoryEntry {
  timestamp: number;
  watchdog_lastMinute: number;
  staff_rollingDaily: number;
}

import { Bot, Shield } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  watchdog_bans: {
    label: "Watchdog Bans",
    color: "hsl(var(--primary))",
    icon: Bot,
  },
  staff_bans: {
    label: "Staff Bans",
    color: "hsl(var(--destructive))",
    icon: Shield,
  },
} satisfies ChartConfig;

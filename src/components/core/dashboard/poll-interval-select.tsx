"use client";

import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStats } from "@/store/use-stats";

const intervals = [
  { value: "30000", label: "30 seconds" },
  { value: "60000", label: "1 minute" },
  { value: "300000", label: "5 minutes" },
];

export function PollIntervalSelect() {
  const { setPollInterval, pollInterval } = useStats();

  const handleValueChange = useCallback(
    (value: string) => {
      setPollInterval(parseInt(value));
    },
    [setPollInterval]
  );

  return (
    <div className="hidden md:flex flex-col items-end">
      <Label
        htmlFor="poll-interval"
        className="text-xs text-muted-foreground mb-1"
      >
        Refresh Interval
      </Label>
      <Select value={pollInterval.toString()} onValueChange={handleValueChange}>
        <SelectTrigger id="poll-interval" className="h-8 w-[120px]">
          <SelectValue placeholder="Select interval" />
        </SelectTrigger>
        <SelectContent>
          {intervals.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import NumberFlow from "@number-flow/react";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStats } from "@/store/use-stats";

import { PollIntervalSelect } from "./poll-interval-select";

interface ToolbarProps {
  timeLeft: number;
  isUpdating: boolean;
}

export function DashboardToolbar({ isUpdating, timeLeft }: ToolbarProps) {
  const { clearData } = useStats();
  const displayTime = timeLeft / 1000;

  return (
    <div className="flex justify-end p-4 md:px-6">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-help">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline">Update in:</span>
                <NumberFlow
                  value={displayTime}
                  format={{
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }}
                />
                s
                {isUpdating && (
                  <span className="text-primary whitespace-nowrap ml-1">
                    (Updating...)
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Time until next data refresh
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator className="hidden sm:block h-8" orientation="vertical" />
        <PollIntervalSelect />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={clearData}
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
                disabled={isUpdating}
              >
                Clear Stats
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Clear all tracked statistics
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

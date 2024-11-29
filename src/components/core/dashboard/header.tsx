import NumberFlow from "@number-flow/react";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { BackButton } from "@/components/core/reusable/back-button";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PollIntervalSelect } from "@/components/core/dashboard/poll-interval-select";

interface HeaderProps {
  timeLeft: number;
  isUpdating: boolean;
  onClear: () => void;
}

export function DashboardHeader({
  timeLeft,
  isUpdating,
  onClear,
}: HeaderProps) {
  const [displayTime, setDisplayTime] = useState(timeLeft / 1000);

  useEffect(() => {
    setDisplayTime(timeLeft / 1000);
  }, [timeLeft]);

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80">
      <div className="w-full px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <BackButton href="/" />
          <div>
            <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
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
              </div>
              {isUpdating && (
                <span className="text-primary whitespace-nowrap">
                  (Updating...)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PollIntervalSelect />
          <Separator orientation="vertical" className="h-6" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onClear}
                  variant="destructive"
                  size="sm"
                  className="px-2 md:px-3"
                  disabled={isUpdating}
                >
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Clear all tracked statistics
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

import NumberFlow from "@number-flow/react";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { BackButton } from "@/components/core/reusable/back-button";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <header className="border-b">
      <div className="container px-4 py-2">
        {/* Top row - Navigation */}
        <div className="flex items-center justify-between mb-2">
          <BackButton href="/" />
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onClear}
                    variant="destructive"
                    size="sm"
                    className="h-8 px-2 lg:px-3"
                    aria-label="Clear all tracked data"
                    disabled={isUpdating}
                  >
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium">
                  Clear all tracked statistics
                </TooltipContent>
              </Tooltip>
              <ModeToggle />
            </TooltipProvider>
          </div>
        </div>

        {/* Bottom row - Title and Timer */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base lg:text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <NumberFlow
                value={displayTime}
                format={{
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }}
              />
              s
              {isUpdating && (
                <span className="text-primary whitespace-nowrap">
                  (Updating...)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

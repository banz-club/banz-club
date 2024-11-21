import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

import { GithubIcon, InfoIcon } from "lucide-react";

import { Link } from "next-view-transitions";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  timeLeft: number;
  isUpdating: boolean;
  onClear: () => void;
}

export function Header({ timeLeft, isUpdating, onClear }: HeaderProps) {
  const [displayTime, setDisplayTime] = useState(timeLeft / 1000);

  useEffect(() => {
    setDisplayTime(timeLeft / 1000);
  }, [timeLeft]);

  return (
    <div className="flex flex-col gap-4 shrink-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl sm:text-2xl font-bold">
            Hypixel Ban Statistics
          </h1>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Wondering how this works? Click the info button.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="text-xs sm:text-sm font-medium tabular-nums">
          Next update in:{" "}
          <NumberFlow
            value={displayTime}
            format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          />
          s{isUpdating && " (Updating...)"}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onClear}
                  variant="destructive"
                  size="sm"
                  aria-label="Clear all tracked data"
                  disabled={isUpdating}
                  className="sm:size-default"
                >
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                Clear all tracked statistics
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                Toggle theme
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label="View source code on GitHub"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Link
                    href="https://github.com/kWAYTV/hypixel-bans-tracker-site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                View on GitHub
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Link href="/info">
                    <InfoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                How it works
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

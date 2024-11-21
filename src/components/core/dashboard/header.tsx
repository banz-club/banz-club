import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

import { GithubIcon, InfoIcon, ArrowLeft } from "lucide-react";

import { Link } from "next-view-transitions";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

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
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-semibold">Hypixel Ban Statistics</h1>
          </Link>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Next update in:{" "}
            <NumberFlow
              value={displayTime}
              format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
            />
            s{isUpdating && " (Updating...)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onClear}
                  variant="destructive"
                  size="sm"
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

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label="View source code on GitHub"
                  className="h-9 w-9"
                >
                  <Link
                    href="https://github.com/kWAYTV/hypixel-bans-tracker-site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                View on GitHub
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                  <Link href="/info">
                    <InfoIcon className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                How it works
              </TooltipContent>
            </Tooltip>

            <ModeToggle />
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}

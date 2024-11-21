import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { GithubIcon, InfoIcon } from "lucide-react";

import { Link } from "next-view-transitions";

interface HeaderProps {
  timeLeft: number;
  isUpdating: boolean;
  onClear: () => void;
}

export function Header({ timeLeft, isUpdating, onClear }: HeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0">
      <h1 className="text-2xl font-bold">Hypixel Ban Statistics</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onClear}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4"
          aria-label="Clear all tracked data"
        >
          Clear Data
        </button>
        <div className="text-sm font-medium">
          Next update in: {(timeLeft / 1000).toFixed(1)}s
          {isUpdating && " (Updating...)"}
        </div>
        <ModeToggle />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://github.com/kWAYTV/hypixel-bans-tracker-site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                aria-label="View source code on GitHub"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">
                  View Hypixel Bans Tracker source code on GitHub
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-medium">
              View on GitHub
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link
          href="/info"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        >
          <InfoIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

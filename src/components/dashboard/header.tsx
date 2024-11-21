import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { GithubIcon } from "lucide-react";

import Link from "next/link";

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
          className="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Clear Data
        </button>
        <div className="text-sm text-muted-foreground">
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
                className="rounded-full p-2 transition-colors hover:bg-muted flex items-center justify-center group"
                aria-label="View source code on GitHub"
              >
                <GithubIcon className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]" />
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
      </div>
    </div>
  );
}

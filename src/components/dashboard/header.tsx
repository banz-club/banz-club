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

interface HeaderProps {
  timeLeft: number;
  isUpdating: boolean;
  onClear: () => void;
}

export function Header({ timeLeft, isUpdating, onClear }: HeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0">
      <div className="flex flex-col gap-1">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">Hypixel Ban Statistics</h1>
        </Link>
        <p className="text-sm text-muted-foreground">
          Wondering how this works? Click the info button.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          Next update in: {(timeLeft / 1000).toFixed(1)}s
          {isUpdating && " (Updating...)"}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onClear}
                variant="destructive"
                aria-label="Clear all tracked data"
                disabled={isUpdating}
              >
                Clear Data
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
              <Button variant="ghost" size="icon" asChild>
                <Link href="/info">
                  <InfoIcon className="h-5 w-5" />
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
  );
}

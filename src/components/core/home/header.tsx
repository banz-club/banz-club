"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";

export function HomeHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-semibold tracking-wide">
              Hypixel Bans
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <Separator orientation="vertical" className="mx-6 h-6" />
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    aria-label="View source code on GitHub"
                    className="h-10 w-10"
                  >
                    <Link
                      href={env.NEXT_PUBLIC_GITHUB_URL}
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

              <ModeToggle />
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}

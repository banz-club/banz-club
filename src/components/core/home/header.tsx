"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { githubRepoUrl } from "@/lib/metadata";

export function HomeHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b bg-background/80"
    >
      <div className="container flex h-14 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="text-lg font-semibold hover:opacity-80 transition-all"
          >
            banz.club
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:scale-105 transition-transform"
          >
            <Link
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}

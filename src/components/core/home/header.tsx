"use client";

import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

import SvgLogo from "@/components/core/reusable/svg-logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { githubRepoUrl } from "@/lib/metadata";

export function HomeHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80"
    >
      <div className="w-full px-4 md:px-6 flex h-14 items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="text-lg font-semibold hover:opacity-80 transition-all flex items-center gap-1 md:gap-2"
          >
            <SvgLogo />
            <span className="text-base md:text-lg">banz.club</span>
          </Link>
        </motion.div>

        <Separator orientation="vertical" className="h-6" />

        <motion.div
          className="flex items-center gap-4 ml-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="linkHover2" size="icon">
              Github
            </Button>
          </Link>
          <ModeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}

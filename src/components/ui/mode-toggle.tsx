"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-10 w-10">
        <div className="relative flex h-full w-full items-center justify-center">
          <Moon className="h-[1.5rem] w-[1.3rem]" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 transition-transform duration-200 hover:scale-105"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.5rem] w-[1.3rem]" />
            ) : (
              <Moon className="h-[1.5rem] w-[1.3rem]" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

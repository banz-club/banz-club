"use client";

import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { HomeHeader } from "@/components/core/home/header";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center flex-1 relative">
      <HomeHeader />

      <div className="flex flex-col items-center justify-center flex-1 gap-8 py-12 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hypixel Ban Statistics
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Track Hypixel&apos;s ban activity with real-time updates, detailed
          metrics, and interactive visualizations.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link
            href="/dash"
            className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              className="flex flex-col gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <p className="text-muted-foreground">
                View real-time ban statistics and analytics
              </p>
            </motion.div>
          </Link>

          <Link
            href="/info"
            className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              className="flex flex-col gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold">Information</h2>
              <p className="text-muted-foreground">
                Learn more about the project and its features
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

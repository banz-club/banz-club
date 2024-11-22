"use client";

import { BorderTrail } from "@/components/motion/border-trail";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

type LinkCardProps = {
  href: string;
  title: string;
  description: string;
};

export function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 bg-background/50 backdrop-blur-sm"
    >
      <BorderTrail
        className="bg-primary/50"
        size={100}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0px 0px 30px 15px rgb(var(--primary) / 0.15)",
        }}
      />
      <motion.div
        className="flex flex-col gap-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>
    </Link>
  );
}

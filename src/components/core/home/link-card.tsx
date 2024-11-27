"use client";

import { Link } from "next-view-transitions";

import { BorderTrail } from "@/components/motion/border-trail";

type LinkCardProps = {
  href: string;
  title: string;
  description: string;
};

export function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-colors bg-background/50 backdrop-blur-sm"
    >
      <BorderTrail
        className="bg-gradient-to-r from-primary to-primary/50"
        size={100}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow:
            "0px 0px 60px 30px rgb(var(--primary) / 0.15), 0 0 100px 60px rgb(var(--primary) / 0.1)",
        }}
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { BackButton } from "@/components/core/reusable/back-button";

export function InfoHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <BackButton href="/" />
          <h1 className="text-xl font-semibold">Information</h1>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}

import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function InfoHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Information</h1>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}

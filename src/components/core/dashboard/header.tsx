import { BackButton } from "@/components/core/reusable/back-button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80">
      <div className="w-full px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <BackButton href="/" />
          <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

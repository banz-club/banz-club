import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "next-view-transitions";

export function HomeHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-center px-4">
        <div className="flex-1 flex justify-center items-center gap-3">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold">Hypixel Bans</span>
          </Link>
          <Link
            href="https://github.com/kWAYTV/hypixel-bans-tracker-site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

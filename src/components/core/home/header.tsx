import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "next-view-transitions";

export function HomeHeader() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">Hypixel Bans</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="https://github.com/kWAYTV/hypixel-bans-tracker-site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}

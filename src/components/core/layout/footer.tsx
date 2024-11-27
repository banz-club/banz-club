import { Link } from "next-view-transitions";

export function Footer() {
  return (
    <footer className="shrink-0 py-4 sm:py-6 flex flex-col items-center gap-2 sm:gap-4">
      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground max-w-[500px] text-center px-4">
        This site is not affiliated with or endorsed by Hypixel Inc. All Hypixel
        related content and assets are property of Hypixel Inc.
      </p>
      <div className="flex items-center justify-center gap-6 text-[8px] sm:text-[10px] text-muted-foreground/70 px-4">
        <Link
          href="https://plancke.io"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] group"
        >
          Data from{" "}
          <span className="font-medium group-hover:text-primary">
            Plancke API
          </span>
        </Link>
      </div>
    </footer>
  );
}

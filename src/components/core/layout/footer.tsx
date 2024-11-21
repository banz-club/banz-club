import { Link } from "next-view-transitions";

export function Footer() {
  return (
    <footer className="shrink-0 py-6 flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <Link
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] group"
        >
          Powered by{" "}
          <span className="font-medium group-hover:text-primary">Next.js</span>
        </Link>
        <span>•</span>
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
      <p className="text-xs font-medium text-muted-foreground max-w-[500px] text-center px-4">
        This site is not affiliated with or endorsed by Hypixel Inc. All Hypixel
        related content and assets are property of Hypixel Inc.
      </p>
    </footer>
  );
}

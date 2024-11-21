import Link from "next/link";

export function Footer() {
  return (
    <footer className="shrink-0 py-6 text-center">
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
    </footer>
  );
}

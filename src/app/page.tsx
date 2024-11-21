import { HomeHeader } from "@/components/core/home/header";
import { Link } from "next-view-transitions";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      <HomeHeader />

      <div className="flex flex-col items-center justify-center flex-1 gap-8 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Hypixel Ban Statistics
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
          Track Hypixel&apos;s ban activity with real-time updates, detailed
          metrics, and interactive visualizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
          <Link
            href="/dash"
            className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <p className="text-muted-foreground">
                View real-time ban statistics and analytics
              </p>
            </div>
          </Link>

          <Link
            href="/info"
            className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Information</h2>
              <p className="text-muted-foreground">
                Learn more about the project and its features
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

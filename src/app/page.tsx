import { Dashboard } from "@/components/dash";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Hypixel Ban Statistics
        </h1>
        <Dashboard />
      </div>
    </main>
  );
}

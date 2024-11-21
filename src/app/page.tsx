import { Dashboard } from "@/components/dash";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <Dashboard />
      </div>
    </main>
  );
}

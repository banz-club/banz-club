import { Dashboard } from "@/components/dashboard";
import { Footer } from "@/components/dashboard/footer";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col min-h-screen">
      <Dashboard />
      <Footer />
    </main>
  );
}

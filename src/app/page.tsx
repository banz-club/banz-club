import { Cards } from "@/components/core/home/cards";
import { HomeHeader } from "@/components/core/home/header";
import { Hero } from "@/components/core/home/hero";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center flex-1 relative">
      <HomeHeader />

      <div className="flex flex-col items-center justify-center flex-1 gap-8 py-12 relative z-10">
        <Hero />
        <Cards />
      </div>
    </main>
  );
}

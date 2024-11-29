import { Cards } from '@/components/core/home/cards';
import { HomeHeader } from '@/components/core/home/header';
import { Hero } from '@/components/core/home/hero';

export default function Home() {
  return (
    <main className='container relative mx-auto flex flex-1 flex-col items-center p-4'>
      <HomeHeader />

      <div className='relative z-10 flex flex-1 flex-col items-center justify-center gap-8 py-12'>
        <Hero />
        <Cards />
      </div>
    </main>
  );
}

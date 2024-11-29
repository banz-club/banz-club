import { BackButton } from '@/components/core/reusable/back-button';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function DashboardHeader() {
  return (
    <header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'>
      <div className='flex h-16 w-full items-center justify-between px-4 md:px-6'>
        <div className='flex items-center gap-2 md:gap-4'>
          <BackButton href='/' />
          <h1 className='text-lg font-semibold md:text-xl'>Dashboard</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

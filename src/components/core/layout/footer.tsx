import { Link } from 'next-view-transitions';

export function Footer() {
  return (
    <footer className='flex shrink-0 flex-col items-center gap-2 py-4 sm:gap-4 sm:py-6'>
      <p className='max-w-[500px] px-4 text-center text-[10px] font-medium text-muted-foreground sm:text-xs'>
        This site is not affiliated with or endorsed by Hypixel Inc. All Hypixel
        related content and assets are property of Hypixel Inc.
      </p>
      <div className='flex items-center justify-center gap-6 px-4 text-[8px] text-muted-foreground/70 sm:text-[10px]'>
        <Link
          href='https://plancke.io'
          target='_blank'
          rel='noopener noreferrer'
          className='group transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]'
        >
          Data from{' '}
          <span className='font-medium group-hover:text-primary'>
            Plancke API
          </span>
        </Link>
      </div>
    </footer>
  );
}

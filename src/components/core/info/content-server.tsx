import { Card } from '@/components/ui/card';

export function InfoContentServer() {
  return (
    <Card className='space-y-4 p-6'>
      <h1 className='text-2xl font-bold'>How It Works</h1>

      <section className='space-y-2'>
        <h2 className='text-lg font-semibold'>Client-Side Processing</h2>
        <p className='text-muted-foreground'>
          This application runs entirely on the client side, which means:
        </p>
        <ul className='ml-4 list-inside list-disc space-y-1 text-muted-foreground'>
          <li>
            All data is stored in your browser&apos;s memory using Zustand
          </li>
          <li>Data is fetched every minute from the Plancke API</li>
          <li>You can customize the refresh interval in the dashboard</li>
          <li>The clear data button will reset everything to initial state</li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-lg font-semibold'>Features</h2>
        <ul className='ml-4 list-inside list-disc space-y-1 text-muted-foreground'>
          <li>Real-time ban statistics tracking</li>
          <li>Interactive charts and visualizations</li>
          <li>Customizable refresh intervals</li>
          <li>Toast notifications for new bans</li>
          <li>Dark and light mode support</li>
          <li>Responsive design that works on all devices</li>
        </ul>
      </section>

      <div className='border-t pt-4 text-sm text-muted-foreground'>
        Note: This application uses the Plancke API to track Hypixel ban
        statistics in real-time. All data is processed client-side using React
        Query and Zustand for state management.
      </div>
    </Card>
  );
}

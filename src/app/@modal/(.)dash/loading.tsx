import { Modal } from '@/components/core/layout/modal';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardModalLoading() {
  return (
    <Modal>
      <div className='space-y-4 px-4 md:space-y-6 md:p-6'>
        <div className='grid shrink-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='h-[74px] w-full rounded-lg' />
          ))}
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px]'>
          <Skeleton className='h-[400px] w-full rounded-lg' />
          <Skeleton className='h-[400px] w-full rounded-lg' />
        </div>
      </div>
    </Modal>
  );
}

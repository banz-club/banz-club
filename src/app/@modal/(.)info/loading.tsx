import { Modal } from '@/components/core/layout/modal';
import { Skeleton } from '@/components/ui/skeleton';

export default function InfoModalLoading() {
  return (
    <Modal>
      <div className='space-y-4 px-4 md:space-y-6 md:p-6'>
        <Skeleton className='min-h-[200px] w-full rounded-lg' />
      </div>
    </Modal>
  );
}

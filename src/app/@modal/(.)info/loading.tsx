import { Modal } from '@/components/core/layout/modal';

export default function InfoModalLoading() {
  return (
    <Modal>
      <div className='flex min-h-[200px] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
      </div>
    </Modal>
  );
}

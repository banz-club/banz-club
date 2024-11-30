import { Dashboard } from '@/components/core/dashboard/dash';
import { Modal } from '@/components/ui/modal';

export default function DashboardModal() {
  return (
    <Modal currentPath='/dash'>
      <div className='pr-4'>
        <Dashboard isModal />
      </div>
    </Modal>
  );
}

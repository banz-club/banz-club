import { Dashboard } from '@/components/core/dashboard/dash';
import { Modal } from '@/components/ui/modal';

export default function DashboardModal() {
  return (
    <Modal currentPath='/dash'>
      <Dashboard isModal />
    </Modal>
  );
}

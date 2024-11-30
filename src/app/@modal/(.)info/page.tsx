import { InfoContent } from '@/components/core/info/content';
import { Modal } from '@/components/ui/modal';

export default function InfoModal() {
  return (
    <Modal currentPath='/info'>
      <InfoContent isModal />
    </Modal>
  );
}

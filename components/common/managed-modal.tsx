import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DaoLauncher from 'components/launcher/dao-launcher';
import { useUI } from 'contexts/ui';

const ManagedModal: React.FC = () => {
  const { isModalOpen, closeModal, modalView } = useUI();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={8}>{modalView === 'DAO_LAUNCH' && <DaoLauncher />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

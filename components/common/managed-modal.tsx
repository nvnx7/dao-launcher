import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useUI } from 'contexts/ui';

const ManagedModal: React.FC = () => {
  const { isModalOpen, closeModal, modalView } = useUI();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>{modalView === 'DAO_LAUNCH' && <></>}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

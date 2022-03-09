import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import DaoDataDownloader from 'components/launcher/dao-data-downloader';
import DaoLauncher from 'components/launcher/dao-launcher';
import { useUI } from 'contexts/ui';

const ManagedModal: React.FC = () => {
  const { isModalOpen, closeModal, modalView } = useUI();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box p={8}>{modalView === 'DEPLOYMENT_DATA_DOWNLOADER' && <DaoDataDownloader />}</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

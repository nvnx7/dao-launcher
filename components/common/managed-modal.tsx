import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import AccountInfo from 'components/account/account-info';
import DaoDataDownloader from 'components/launcher/dao-data-downloader';
import { useUI } from 'contexts/ui';

const ManagedModal: React.FC = () => {
  const { isModalOpen, closeModal, modalView } = useUI();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={8}>
          {modalView === 'DEPLOYMENT_DATA_DOWNLOADER' && <DaoDataDownloader />}
          {modalView === 'ACCOUNT_INFO' && <AccountInfo />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

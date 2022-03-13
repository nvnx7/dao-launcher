import { useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  StackProps,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import useDaoLauncher, { DaoLauncherParams } from 'hooks/useDaoLauncher';
import { CheckIcon } from '@chakra-ui/icons';
import { useUI } from 'contexts/ui';
import DaoInfo from 'components/dao/dao-info';

interface IDaoLauncherProps extends StackProps {
  params: DaoLauncherParams;
}

const LaunchStep: React.FC<{ isDone: boolean; label: string }> = ({ isDone, label }) => {
  return (
    <HStack alignItems="center">
      {isDone ? <CheckIcon color="green.500" /> : <Spinner size="sm" color="red.500" />}
      <Text fontWeight={'bold'}>{label}</Text>
    </HStack>
  );
};

const DaoLauncher: React.FC<IDaoLauncherProps> = ({ params, ...props }) => {
  const toast = useToast();
  const { setModalData, setModalViewAndOpen } = useUI();
  const { deployDao, isLoading, status, transactions, isSuccessful, isError } = useDaoLauncher();

  useEffect(() => {
    if (isError) {
      toast({ status: 'error', title: 'Error!', description: 'Something went wrong :(' });
    }
    if (!isSuccessful) return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessful, isError]);

  useEffect(() => {
    if (transactions) {
      setModalData(transactions);
      setModalViewAndOpen('DEPLOYMENT_DATA_DOWNLOADER');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const handleLaunch = () => {
    deployDao(params);
  };

  return (
    <VStack alignItems="center" spacing={8} {...props}>
      <Heading color="primary.500" alignSelf="center">
        Launch
      </Heading>
      {isLoading ? (
        <Box>
          <LaunchStep isDone={status.isTokenDeployed} label="Deploying Token Contract" />
          <LaunchStep isDone={status.isTimelockDeployed} label="Deploying Timelock Contract" />
          <LaunchStep isDone={status.isGovernorDeployed} label="Deploying Governor Contract" />
        </Box>
      ) : (
        <Box w="full">
          <DaoInfo params={params} />
        </Box>
      )}

      <Button mb={4} isLoading={isLoading} onClick={handleLaunch} alignSelf="center">
        Launch
      </Button>
    </VStack>
  );
};

export default DaoLauncher;

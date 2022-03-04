import {
  Box,
  Button,
  Heading,
  HStack,
  ListItem,
  Spinner,
  StackProps,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import useDaoLauncher from 'hooks/useDaoLauncher';
import { CheckIcon } from '@chakra-ui/icons';
import { useUI } from 'contexts/ui';

interface IDaoLauncherProps extends StackProps {}

const LaunchStep: React.FC<{ isDone: boolean; label: string }> = ({ isDone, label }) => {
  return (
    <HStack alignItems="center">
      {isDone ? <CheckIcon color="green.500" /> : <Spinner size="sm" color="red.500" />}
      <Text fontWeight={'bold'}>{label}</Text>
    </HStack>
  );
};

const DaoLauncher: React.FC<IDaoLauncherProps> = ({ ...props }) => {
  const { modalData: params } = useUI();
  const { deployDao, isLoading, status, transactions } = useDaoLauncher();

  const handleLaunch = () => {
    deployDao(params);
  };

  return (
    <VStack alignItems="center" spacing={8} {...props}>
      <Heading color="primary.500" alignSelf="center">
        Launcher🚀
      </Heading>
      {isLoading ? (
        <Box>
          <LaunchStep isDone={status.tokenDeployed} label="Deploying Token Contract" />
          <LaunchStep isDone={status.timelockDeployed} label="Deploying Timelock Contract" />
          <LaunchStep isDone={status.governorDeployed} label="Deploying Governor Contract" />
        </Box>
      ) : (
        <UnorderedList>
          <ListItem>Deploying Token Contract</ListItem>
          <ListItem>Deploying Timelock Contract</ListItem>
          <ListItem>Deploying Governor Contract</ListItem>
        </UnorderedList>
      )}

      <Button mb={4} isLoading={isLoading} onClick={handleLaunch} alignSelf="center">
        Launch
      </Button>
    </VStack>
  );
};

export default DaoLauncher;

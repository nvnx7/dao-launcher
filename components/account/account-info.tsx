import { Badge, Button, Circle, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import { useWeb3Provider } from 'contexts/web3-provider';
import { constants, utils } from 'ethers';

const AccountInfo: React.FC<StackProps> = ({ ...props }) => {
  const { network, account, disconnect } = useWeb3Provider();

  return (
    <VStack w="full" {...props}>
      <HStack justify="space-between" w="full" py={4}>
        <HStack alignItems="center">
          <Circle p={1} bg={account.isConnected ? 'green.500' : 'gray.500'} />
          <Text color={account.isConnected ? 'green.500' : 'gray.500'} fontSize="sm">
            {account.isConnected ? 'Connected' : 'Not Connected'}
          </Text>
        </HStack>
        <Badge px={2} colorScheme="green" fontSize="xs" rounded="sm">
          {network?.name?.toUpperCase()}
        </Badge>
      </HStack>

      <Text color="gray.400">
        {account.address?.slice(0, 7)}...{account.address?.slice(-5)}
      </Text>
      <Text fontSize="xl" fontWeight="bold" py={4}>
        {constants.EtherSymbol} {account.balance ? utils.formatEther(account.balance) : '0'}
      </Text>

      <Button onClick={() => disconnect()} mt={4}>
        Disconnect
      </Button>
    </VStack>
  );
};

export default AccountInfo;

import { Text } from '@chakra-ui/react';
import ConnectWalletButton from 'components/account/connect-button';
import { useWeb3Provider } from 'contexts/web3-provider';
import Card from 'components/common/card';

const WalletConnectedView: React.FC = ({ children }) => {
  const { isConnected } = useWeb3Provider();

  return (
    <>
      {isConnected ? (
        children
      ) : (
        <Card display="flex" flexDirection="column" alignItems="center">
          <Text p={8}>Looks like you are not connected yet...</Text>
          <ConnectWalletButton />
        </Card>
      )}
    </>
  );
};

export default WalletConnectedView;

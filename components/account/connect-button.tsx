import { Button, ButtonProps } from '@chakra-ui/react';
import { useWeb3Provider } from 'contexts/web3-provider';

const ConnectWalletButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { connect, disconnect, isLoading, account, isConnected } = useWeb3Provider();

  function handleClick() {
    if (!isConnected) connect();
    else disconnect();
  }

  let btnLabel = 'Connect Wallet';
  if (isLoading) btnLabel = 'Connecting...';
  else if (isConnected) btnLabel = `Disconnect ${account?.address?.slice(0, 8).concat('...')}`;

  return (
    <Button onClick={handleClick} isLoading={isLoading} {...props}>
      {btnLabel}
    </Button>
  );
};

export default ConnectWalletButton;

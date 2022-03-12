import { Button, ButtonProps } from '@chakra-ui/react';
import { useUI } from 'contexts/ui';
import { useWeb3Provider } from 'contexts/web3-provider';

const ConnectWalletButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { connect, isLoading, account } = useWeb3Provider();
  const { setModalViewAndOpen } = useUI();

  function handleClick() {
    if (!account.isConnected) connect();
    else {
      setModalViewAndOpen('ACCOUNT_INFO');
    }
  }

  let btnLabel = 'Connect Wallet';
  if (isLoading) btnLabel = 'Connecting...';
  else if (account.isConnected)
    btnLabel = `Connected ${account?.address?.slice(0, 8).concat('...')}`;

  return (
    <Button onClick={handleClick} isLoading={isLoading} {...props}>
      {btnLabel}
    </Button>
  );
};

export default ConnectWalletButton;

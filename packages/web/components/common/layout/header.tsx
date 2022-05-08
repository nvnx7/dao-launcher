import { Flex, FlexProps, HStack } from '@chakra-ui/react';
import Link from 'components/common/link';
import ConnectWalletButton from 'components/account/connect-button';
import Logo from '../logo';

const Header: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex p={4} justify="space-between" {...props}>
      <Link href="/">
        <Logo />
      </Link>
      <HStack spacing={8}>
        <HStack as="nav" spacing={4}>
          <Link href="/">Home</Link>
          <Link href="/launch">Launcher</Link>
        </HStack>

        <ConnectWalletButton />
      </HStack>
    </Flex>
  );
};

export default Header;

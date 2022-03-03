import { Flex, FlexProps, Heading, HStack } from '@chakra-ui/react';
import Link from 'components/common/link';
import Logo from '../logo';

const Header: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex p={4} justify="space-between" {...props}>
      <Link href="/">
        <Logo />
      </Link>
      <HStack spacing={4}>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
      </HStack>
    </Flex>
  );
};

export default Header;

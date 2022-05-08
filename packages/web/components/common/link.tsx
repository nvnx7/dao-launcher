import { Link as ChakraLink } from '@chakra-ui/react';
import { default as NextLink, LinkProps } from 'next/link';

interface ILinkProps extends LinkProps {
  href: string;
}

const Link: React.FC<ILinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} as={href} passHref {...props}>
      <ChakraLink>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;

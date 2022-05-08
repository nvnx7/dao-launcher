import { VStack, Box, StackProps } from '@chakra-ui/react';
import Footer from './footer';
import Header from './header';

const Layout: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack w="full" align={'stretch'} {...props}>
      <Header />
      <Box minH="81vh" flex={1}>
        {children}
      </Box>
      <Footer />
    </VStack>
  );
};

export default Layout;

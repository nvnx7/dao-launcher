import { Center, StackProps, HStack, Text } from '@chakra-ui/react';

const Footer: React.FC<StackProps> = ({ ...props }) => {
  return (
    <HStack as="footer" p={8} w="100%" justify="space-between" bg="primary.700" {...props}>
      <Center w="full">
        <Text color="white" fontWeight="bold" fontSize="xl">
          Built by @theNvN
        </Text>
      </Center>
    </HStack>
  );
};

export default Footer;

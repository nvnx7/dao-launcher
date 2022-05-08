import { StackProps, Text, VStack } from '@chakra-ui/react';

interface LogoProps extends StackProps {
  color: string;
}

const Logo: React.FC<StackProps> = ({ color, ...props }) => {
  return (
    <VStack spacing={-2} alignItems="flex-start" {...props}>
      <Text fontWeight="bold" fontSize="xl" color={color}>
        TheDAO
      </Text>
      <Text fontWeight="bold" fontSize="xl" color={color}>
        Launcher
      </Text>
    </VStack>
  );
};

export default Logo;

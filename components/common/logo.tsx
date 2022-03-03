import { Box, BoxProps, Text } from '@chakra-ui/react';

const Logo: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <Text fontWeight="bold" fontSize="xl">
        The DAO
        <br />
        Launcher
      </Text>
    </Box>
  );
};

export default Logo;

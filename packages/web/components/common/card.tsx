import { Box, BoxProps } from '@chakra-ui/react';

const Card: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box boxShadow="2xl" rounded="md" p={6} {...props}>
      {children}
    </Box>
  );
};

export default Card;

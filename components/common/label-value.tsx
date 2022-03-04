import { HStack, StackProps, Text } from '@chakra-ui/react';

interface ILabelValueProps extends StackProps {
  label: string;
  value?: string | number;
}

const LabelValuePair: React.FC<ILabelValueProps> = ({ label, value, ...props }) => {
  return (
    <HStack alignItems="flex-start" {...props}>
      <Text fontWeight="bold" flex={0.5}>
        {label}:
      </Text>
      <Text flex={1}>{value || '-'}</Text>
    </HStack>
  );
};

export default LabelValuePair;

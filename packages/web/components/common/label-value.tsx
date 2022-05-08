import { HStack, StackProps, Text, TextProps } from '@chakra-ui/react';

interface ILabelValueProps extends StackProps {
  label: string;
  value?: string | number;
  labelProps?: TextProps;
  valueProps?: TextProps;
}

export const LabelValuePair: React.FC<ILabelValueProps> = ({
  label,
  value,
  labelProps,
  valueProps,
  ...props
}) => {
  return (
    <HStack alignItems="flex-start" justify="space-between" spacing={12} {...props}>
      <Text fontWeight="bold" {...labelProps}>
        {label}:
      </Text>
      <Text {...valueProps}>{value || '-'}</Text>
    </HStack>
  );
};

export default LabelValuePair;

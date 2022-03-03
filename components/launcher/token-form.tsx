import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';

const schema = yup.object().shape({
  name: yup.string().max(32, 'Too long').required('Required'),
  symbol: yup.string().max(5, 'Too long').required('Required'),
});

interface ITokenInput {
  name: string;
  symbol: string;
}

interface ITokenFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: ITokenInput) => void;
}

const TokenForm: React.FC<ITokenFormProps> = ({ onSubmit, ...props }) => {
  const { control, handleSubmit } = useForm<ITokenInput>({
    resolver: yupResolver(schema) as any,
  });
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput
        label="Name of the governance token"
        name="name"
        control={control}
        placeholder="Example Token"
      />
      <FormInput label="Token symbol" name="symbol" control={control} placeholder="EXT" />
    </VStack>
  );
};

export default TokenForm;

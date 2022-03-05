import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Radio, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';
import { FormRadioGroup } from 'components/common/form/radio';

const schema = yup.object().shape({
  name: yup.string().max(32, 'Too long').required('Required'),
  symbol: yup.string().max(5, 'Too long').required('Required'),
  type: yup.string().oneOf(['erc20', 'erc721']).required('Required'),
});

interface ITokenInput {
  name: string;
  symbol: string;
  type: string;
}

interface ITokenFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: ITokenInput) => void;
}

const defaultValues = {
  name: 'Example Token',
  symbol: 'EXT',
  type: 'erc20',
};

const TokenForm: React.FC<ITokenFormProps> = ({ onSubmit, ...props }) => {
  const { control, handleSubmit } = useForm<ITokenInput>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormRadioGroup
        label="Token Type"
        control={control}
        name="type"
        _radioGroup={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Radio value="erc20">ERC-20</Radio>
        <Radio value="erc721" mx={8}>
          ERC-721 (NFTs)
        </Radio>
      </FormRadioGroup>
      <FormInput
        label="Token Name"
        name="name"
        control={control}
        placeholder="Example Token"
        helperText="Name of the governance token"
      />
      <FormInput
        label="Token Symbol"
        name="symbol"
        control={control}
        placeholder="EXT"
        _input={{ textTransform: 'uppercase' }}
      />

      <Button type="submit" alignSelf="flex-end">
        Next: Timelock
      </Button>
    </VStack>
  );
};

export default TokenForm;

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Center, HStack, Radio, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';
import { FormRadioGroup } from 'components/common/form/radio';
import { utils } from 'ethers';
import FormCheckbox from 'components/common/form/chekcbox';
import { isDevEnv } from 'settings/env';
import { MouseEventHandler } from 'react';

const schemaToken = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .when('haveAddress', {
      is: false,
      then: yup.string().required('Required').max(32, 'Too long').required('Required'),
    }),
  symbol: yup
    .string()
    .nullable()
    .when('haveAddress', {
      is: false,
      then: yup.string().required('Required').max(5, 'Too long').required('Required'),
    }),
  type: yup
    .string()
    .nullable()
    .when('haveAddress', {
      is: false,
      then: yup.string().required('Required').oneOf(['erc20', 'erc721']).required('Required'),
    }),
  haveAddress: yup.bool().required(),
  initialSupply: yup
    .string()
    //@ts-ignore
    .when(['haveAddress', 'type'], (haveAddress, type) => {
      if (!haveAddress && type === 'erc20') {
        return yup
          .number()
          .integer('Must be integer')
          .min(1, 'Minimum 1')
          .typeError('Invalid number')
          .required('Required');
      } else {
        return yup.string().nullable();
      }
    }),
  address: yup
    .string()
    .nullable()
    .when('haveAddress', {
      is: true,
      then: yup
        .string()
        .required('Required')
        .test(
          'address',
          'Invalid address',
          (v: any) => v && v.startsWith('0x') && utils.isAddress(v),
        ),
    }),
});

interface ITokenInput {
  name: string;
  symbol: string;
  type: string;
  initialSupply: number;
  haveAddress: boolean;
  address: string;
}

interface ITokenFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: ITokenInput) => void;
  onPrevClick: MouseEventHandler<HTMLButtonElement>;
}

const defaultValues = {
  name: isDevEnv ? 'Example Token' : '',
  symbol: isDevEnv ? 'EXT' : '',
  type: 'erc20',
  initialSupply: 1000,
  haveAddress: false,
  address: isDevEnv ? '0xffffffffffffffffffffffffffffffffffffffff' : '',
};

const TokenForm: React.FC<ITokenFormProps> = ({ onSubmit, onPrevClick, ...props }) => {
  const { control, handleSubmit } = useForm<ITokenInput>({
    resolver: yupResolver(schemaToken),
    defaultValues,
  });
  const tokenType = useWatch({ name: 'type', control });
  const haveAddress = useWatch({ name: 'haveAddress', control });

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Center>
        <FormCheckbox
          control={control}
          name="haveAddress"
          label="I have already deployed Token address"
        />
      </Center>
      {haveAddress ? (
        <FormInput
          label="Token Contract Address"
          name="address"
          control={control}
          placeholder="0xff4a320..."
        />
      ) : (
        <>
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
          <FormInput label="Token Name" name="name" control={control} placeholder="Example Token" />

          <HStack justify="space-between" alignItems="flex-start" w="full">
            <FormInput
              label="Token Symbol"
              name="symbol"
              control={control}
              placeholder="EXT"
              _input={{ textTransform: 'uppercase' }}
            />
            <FormInput
              label="Initial Supply"
              name="initialSupply"
              control={control}
              placeholder="1000"
              _input={{ textTransform: 'uppercase' }}
              helperText="DO NOT multiply by any decimal (eg. 10^18) "
              isDisabled={tokenType !== 'erc20'}
            />
          </HStack>
        </>
      )}

      <HStack justify="flex-end" spacing={4} alignSelf="flex-end" mt={4}>
        <Button variant="ghost" onClick={onPrevClick}>
          Previous
        </Button>
        <Button type="submit" alignSelf="flex-end">
          Next: Timelock
        </Button>
      </HStack>
    </VStack>
  );
};

export default TokenForm;

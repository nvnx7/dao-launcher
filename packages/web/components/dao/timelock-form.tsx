import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Center, HStack, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';
import { evolve, multiply } from 'ramda';
import { utils } from 'ethers';
import FormCheckbox from 'components/common/form/chekcbox';
import { isDevEnv } from 'settings/env';
import { MouseEventHandler } from 'react';

const schemaTimelock = yup.object().shape({
  haveAddress: yup.bool().required(),
  minDelay: yup.string().when('haveAddress', (haveAddr) => {
    if (haveAddr) {
      return yup.string().nullable();
    } else {
      return yup
        .number()
        .integer('Should be integer value')
        .typeError('Invalid number')
        .min(0)
        .required('Required');
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

interface ITimelockInput {
  minDelay: number;
  haveAddress: boolean;
  address: string;
}

interface ITimelockFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: ITimelockInput) => void;
  onPrevClick: MouseEventHandler<HTMLButtonElement>;
}

const defaultValues = {
  minDelay: 24,
  address: isDevEnv ? '0xffffffffffffffffffffffffffffffffffffffff' : '',
  haveAddress: false,
};

const TimelockForm: React.FC<ITimelockFormProps> = ({ onSubmit, onPrevClick, ...props }) => {
  const { control, handleSubmit } = useForm<ITimelockInput>({
    resolver: yupResolver(schemaTimelock),
    defaultValues,
  });

  const haveAddress = useWatch({ name: 'haveAddress', control });

  const _onSubmit = (data: ITimelockInput) => {
    onSubmit(
      // Delay hours to seconds
      evolve({ minDelay: multiply(3600) }, data),
    );
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(_onSubmit)} {...props}>
      <Center>
        <FormCheckbox
          control={control}
          name="haveAddress"
          label="I have already deployed Timelock address"
        />
      </Center>

      {haveAddress && (
        <FormInput
          label="Timelock Contract Address"
          name="address"
          control={control}
          placeholder="0xff4a320..."
        />
      )}

      {!haveAddress && (
        <FormInput
          label="Timelock Delay (in hours)"
          name="minDelay"
          control={control}
          placeholder="24"
          helperText="Delay until execution of a successful proposal"
        />
      )}

      <HStack justify="flex-end" spacing={4} alignSelf="flex-end">
        <Button variant="ghost" onClick={onPrevClick}>
          Previous
        </Button>
        <Button type="submit" alignSelf="flex-end">
          Next: Governor
        </Button>
      </HStack>
    </VStack>
  );
};

export default TimelockForm;

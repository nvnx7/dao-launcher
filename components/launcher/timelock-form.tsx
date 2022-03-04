import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';

const schema = yup.object().shape({
  minDelay: yup
    .number()
    .integer('Should be integer value')
    .typeError('Invalid number')
    .min(0)
    .required('Required'),
});

interface ITimelockInput {
  minDelay: number;
}

interface ITimelockFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: ITimelockInput) => void;
}

const TimelockForm: React.FC<ITimelockFormProps> = ({ onSubmit, ...props }) => {
  const { control, handleSubmit } = useForm<ITimelockInput>({
    resolver: yupResolver(schema) as any,
    defaultValues: { minDelay: 3600 },
  });
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput
        label="Minimum timelock delay (in seconds)"
        name="minDelay"
        control={control}
        placeholder="3600"
      />

      <Button type="submit" alignSelf="flex-end">
        Next: Governor
      </Button>
    </VStack>
  );
};

export default TimelockForm;

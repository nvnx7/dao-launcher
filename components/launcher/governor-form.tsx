import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';

const schema = yup.object().shape({
  votingDelay: yup
    .number()
    .integer('Should be integer value')
    .typeError('Invalid number')
    .min(0)
    .required('Required'),
  votingPeriod: yup
    .number()
    .integer('Should be integer value')
    .typeError('Invalid number')
    .min(0)
    .required('Required'),
  proposalThreshold: yup
    .number()
    .integer('Should be integer value')
    .typeError('Invalid number')
    .min(0)
    .required('Required'),
  quorumFraction: yup
    .number()
    .integer('Should be integer value')
    .typeError('Invalid number')
    .min(0)
    .required('Required'),
});

const defaultValues = {
  votingDelay: 1,
  votingPeriod: 1,
  proposalThreshold: 0,
  quorumFraction: 4,
};

interface IGovernorInput {
  votingDelay: number;
  votingPeriod: number;
  proposalThreshold: number;
  quorumFraction: number;
}

interface IGovernorFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: IGovernorInput) => void;
}

const GovernorForm: React.FC<IGovernorFormProps> = ({ onSubmit, ...props }) => {
  const { control, handleSubmit } = useForm<IGovernorInput>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput
        label="Voting Delay (in hours)"
        name="votingDelay"
        control={control}
        placeholder="1"
        helperText="Delay before voting starts"
      />
      <FormInput
        label="Voting Period (in days)"
        name="votingPeriod"
        control={control}
        placeholder="270"
        helperText="Time until voting is active"
      />
      <FormInput
        label="Proposal Threshold"
        name="proposalThreshold"
        control={control}
        helperText="Minimum number of voter required to send a proposal"
        placeholder="0"
      />
      <FormInput
        label="Percent of votes required to reach quorum"
        name="quorumFraction"
        control={control}
        placeholder="4"
      />

      <Button type="submit" alignSelf="flex-end" mt={4}>
        Next: Governor
      </Button>
    </VStack>
  );
};

export default GovernorForm;

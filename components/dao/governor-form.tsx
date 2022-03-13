import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Stack, StackProps, VStack, HStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';
import { evolve } from 'ramda';
import { daysToBlocks, hoursToBlocks } from 'utils/date-time';
import { MouseEventHandler } from 'react';

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
  onPrevClick: MouseEventHandler<HTMLButtonElement>;
}

const GovernorForm: React.FC<IGovernorFormProps> = ({ onSubmit, onPrevClick, ...props }) => {
  const { control, handleSubmit } = useForm<IGovernorInput>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });

  const _onSubmit = (data: IGovernorInput) => {
    const blockTime = 13.6; // seconds
    onSubmit(
      evolve(
        {
          votingDelay: hoursToBlocks(blockTime),
          votingPeriod: daysToBlocks(blockTime),
        },
        data,
      ),
    );
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(_onSubmit)} {...props}>
      <Stack direction={['column', 'row']} justify="space-between" w="full" wrap="wrap">
        <FormInput
          label="Voting Delay (in hours)"
          name="votingDelay"
          control={control}
          placeholder="1"
          helperText="Delay before voting starts"
          flex={0.5}
        />
        <FormInput
          label="Voting Period (in days)"
          name="votingPeriod"
          control={control}
          placeholder="270"
          helperText="Time until voting is open"
          flex={0.5}
        />
      </Stack>
      <FormInput
        label="Proposal Threshold"
        name="proposalThreshold"
        control={control}
        helperText="Minimum number of voter required to send a proposal"
        placeholder="0"
      />
      <FormInput
        label="Quorum Fraction"
        name="quorumFraction"
        control={control}
        placeholder="4"
        helperText="Percent of votes required to reach quorum"
      />

      <HStack justify="flex-end" spacing={4} alignSelf="flex-end" mt={4}>
        <Button variant="ghost" onClick={onPrevClick}>
          Previous
        </Button>
        <Button type="submit" alignSelf="flex-end" mt={4}>
          Next: Governor
        </Button>
      </HStack>
    </VStack>
  );
};

export default GovernorForm;

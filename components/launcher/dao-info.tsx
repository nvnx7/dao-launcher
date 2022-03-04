import { Heading, VStack, Text, StackProps, Box } from '@chakra-ui/react';
import LabelValuePair from 'components/common/label-value';
import { DaoLauncherParams } from 'hooks/useDaoLauncher';

interface IDaoInfoProps extends StackProps {
  params: DaoLauncherParams;
}

const DaoInfo: React.FC<IDaoInfoProps> = ({ params, ...props }) => {
  const { dao, token, timelock, governor } = params;
  return (
    <VStack alignItems="stretch" {...props}>
      <Heading>{dao.name}</Heading>
      <Box>
        <Text color="primary.500" fontWeight="bold">
          Token
        </Text>
        <LabelValuePair label="Type" value={token.type?.toUpperCase()} />
        <LabelValuePair label="Name" value={token.name} />
        <LabelValuePair label="Symbol" value={token.symbol} />
      </Box>

      <Box>
        <Text fontWeight="bold" color="primary.500">
          Timelock
        </Text>
        <LabelValuePair label="Delay" value={`${timelock.minDelay} hour(s)`} />
      </Box>

      <Box>
        <Text fontWeight="bold" color="primary.500">
          Governor
        </Text>
        <LabelValuePair label="Voting Delay" value={`${governor.votingDelay} hour(s)`} />
        <LabelValuePair label="Voting Period" value={`${governor.votingPeriod} day(s)`} />
        <LabelValuePair label="Proposal Threshold" value={`${governor.proposalThreshold} tokens`} />
        <LabelValuePair label="Quorum Fraction" value={`${governor.quorumFraction}%`} />
      </Box>
    </VStack>
  );
};

export default DaoInfo;

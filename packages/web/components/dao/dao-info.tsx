import { Heading, VStack, Text, StackProps, Box } from '@chakra-ui/react';
import LabelValuePair from 'components/common/label-value';
import { DaoLauncherParams } from 'hooks/useDaoLauncher';
import { blocksToDays, blocksToHours, secondsToHours } from 'utils/date-time';

interface IDaoInfoProps extends StackProps {
  params: DaoLauncherParams;
}
const blockTime = 13.6; //sec
const DaoInfo: React.FC<IDaoInfoProps> = ({ params, ...props }) => {
  const { dao, token, timelock, governor } = params;
  return (
    <VStack w="full" {...props}>
      <Heading fontSize="2xl" color="primary.500">
        {dao.name}
      </Heading>
      <Box w="full">
        <Text color="primary.500" fontWeight="bold">
          Token
        </Text>
        {token?.haveAddress ? (
          <LabelValuePair label="Address" value={token.address} />
        ) : (
          <>
            <LabelValuePair label="Type" value={token.type?.toUpperCase()} />
            <LabelValuePair label="Name" value={token.name} />
            <LabelValuePair label="Symbol" value={token.symbol} />
            <LabelValuePair label="Initial Supply" value={`${token.initialSupply} tokens`} />
          </>
        )}
      </Box>

      <Box w="full">
        <Text fontWeight="bold" color="primary.500">
          Timelock
        </Text>
        {timelock?.haveAddress ? (
          <LabelValuePair label="Address" value={`${timelock.address}`} />
        ) : (
          <LabelValuePair
            label="Delay"
            value={`${timelock.minDelay} sec (~${secondsToHours(timelock.minDelay)} hours)`}
          />
        )}
      </Box>

      <Box w="full">
        <Text fontWeight="bold" color="primary.500">
          Governor
        </Text>
        <LabelValuePair
          label="Voting Delay"
          value={`${governor.votingDelay} blocks (~${blocksToHours(blockTime)(
            governor.votingDelay,
          )} hours)`}
        />
        <LabelValuePair
          label="Voting Period"
          value={`${governor.votingPeriod} blocks (~${blocksToDays(blockTime)(
            governor.votingPeriod,
          )} days)`}
        />
        <LabelValuePair label="Proposal Threshold" value={`${governor.proposalThreshold} tokens`} />
        <LabelValuePair label="Quorum Fraction" value={`${governor.quorumFraction}%`} />
      </Box>
    </VStack>
  );
};

export default DaoInfo;

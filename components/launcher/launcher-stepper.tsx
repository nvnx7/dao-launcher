import { Button, Center, Flex, FlexProps, Heading, Text, VStack } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import ConnectWalletButton from 'components/account/connect-button';
import { useUI } from 'contexts/ui';
import { useWeb3Provider } from 'contexts/web3-provider';
import { useState } from 'react';
import DaoForm from './dao-form';
import DaoInfo from './dao-info';
import GovernorForm from './governor-form';
import TimelockForm from './timelock-form';
import TokenForm from './token-form';

const stepStyleProps = {
  w: 'full',
  py: 8,
  px: 4,
  mt: 4,
  borderWidth: 2,
  borderColor: 'primary.500',
  rounded: 'md',
};

const LauncherStepper: React.FC<FlexProps> = ({ ...props }) => {
  const [params, setParams] = useState({});
  const { setModalViewAndOpen, setModalData } = useUI();
  const { isConnected } = useWeb3Provider();
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  function onDataSubmit(key: string, data: any) {
    setParams({ ...params, [key]: data });
    nextStep();
  }

  function handleConfirm() {
    console.log({ params });
    setModalData(params);
    setModalViewAndOpen('DAO_LAUNCH');
  }

  if (!isConnected) {
    return (
      <VStack {...stepStyleProps} maxW="4xl">
        <Text>Looks like you are not connected yet...</Text>
        <ConnectWalletButton />
      </VStack>
    );
  }

  return (
    <Flex flexDir="column" width="100%" {...props}>
      <Steps
        activeStep={activeStep}
        orientation="horizontal"
        onClickStep={(step) => setStep(step)}
        labelOrientation="vertical"
      >
        <Step label="DAO">
          <VStack {...stepStyleProps}>
            <Heading color="primary.500">DAO</Heading>
            <Text textAlign="center" mb={4}>
              Information related to the DAO.
            </Text>
            <DaoForm onSubmit={(data) => onDataSubmit('dao', data)} w="full" maxW="xl" />
          </VStack>
        </Step>

        <Step label="Token">
          <VStack {...stepStyleProps}>
            <Heading color="primary.500">Governance Token</Heading>
            <Text textAlign="center" mb={4}>
              This is the token that will be counted as votes. Anybody with this token will be able
              to vote.
            </Text>
            <TokenForm onSubmit={(data) => onDataSubmit('token', data)} w="full" maxW="xl" />
          </VStack>
        </Step>

        <Step label="Timelock">
          <VStack {...stepStyleProps}>
            <Heading color="primary.500">Timelock</Heading>
            <Text textAlign="center" px={4} mb={4}>
              Timelock ensures that a successful proposal goes through a delay period before it can
              be executed at all.
            </Text>
            <TimelockForm onSubmit={(data) => onDataSubmit('timelock', data)} w="full" maxW="xl" />
          </VStack>
        </Step>

        <Step label="Governor">
          <VStack {...stepStyleProps}>
            <Heading color="primary.500">Governor</Heading>
            <Text textAlign="center" px={4} mb={4}>
              The main governor contract that takes care of all governance routines like handling a
              proposal, casting votes, sending execution to timelock, etc.
            </Text>
            <GovernorForm onSubmit={(data) => onDataSubmit('governor', data)} w="full" maxW="xl" />
          </VStack>
        </Step>
      </Steps>

      {activeStep === 4 && (
        <VStack {...stepStyleProps}>
          <Heading color="primary.500" fontWeight="bold">
            All Set!
          </Heading>
          <Text pb={4}>All parameters have been set. Click to start launch!</Text>
          <Center w="full">
            <DaoInfo params={params as any} w="full" maxW="lg" />
          </Center>
          <Button my={16} onClick={handleConfirm}>
            Confirm!
          </Button>
        </VStack>
      )}
    </Flex>
  );
};

export default LauncherStepper;

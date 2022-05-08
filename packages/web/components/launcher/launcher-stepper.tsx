import { Flex, FlexProps, Heading, Text } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import Card from 'components/common/card';
import WalletConnectedView from 'components/common/wallet-connected-view';
import { DaoLauncherParams } from 'hooks/useDaoLauncher';
import { useState } from 'react';
import DaoForm from '../dao/dao-form';
import GovernorForm from '../dao/governor-form';
import TimelockForm from '../dao/timelock-form';
import TokenForm from '../dao/token-form';
import DaoLauncher from './dao-launcher';

const LauncherStepper: React.FC<FlexProps> = ({ ...props }) => {
  const [params, setParams] = useState<DaoLauncherParams>();
  const { nextStep, activeStep, setStep, prevStep } = useSteps({
    initialStep: 0,
  });

  function onDataSubmit(key: string, data: any) {
    setParams({ ...params, [key]: data } as any);
    nextStep();
  }

  return (
    <WalletConnectedView>
      <Flex flexDir="column" width="100%" {...props}>
        <Steps
          activeStep={activeStep}
          orientation="horizontal"
          onClickStep={(step) => setStep(step)}
          labelOrientation="vertical"
        >
          <Step label="DAO">
            <Card display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Heading color="primary.500" fontWeight="black">
                DAO
              </Heading>
              <Text textAlign="center" my={4} maxW="xl">
                Information related to the DAO.
              </Text>
              <DaoForm onSubmit={(data) => onDataSubmit('dao', data)} w="full" maxW="xl" />
            </Card>
          </Step>

          <Step label="Token">
            <Card display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Heading color="primary.500">Governance Token</Heading>
              <Text textAlign="center" my={4} maxW="xl">
                This is the token that will be counted as votes. Anybody with this token will be
                able to vote.
              </Text>
              <TokenForm
                onSubmit={(data) => onDataSubmit('token', data)}
                onPrevClick={() => prevStep()}
                w="full"
                maxW="xl"
              />
            </Card>
          </Step>

          <Step label="Timelock">
            <Card display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Heading color="primary.500">Timelock</Heading>
              <Text textAlign="center" my={4} maxW="xl">
                Timelock ensures that a successful proposal goes through a delay period before it
                can be executed at all.
              </Text>
              <TimelockForm
                onSubmit={(data) => onDataSubmit('timelock', data)}
                onPrevClick={() => prevStep()}
                w="full"
                maxW="xl"
              />
            </Card>
          </Step>

          <Step label="Governor">
            <Card display="flex" flexDirection="column" alignItems="center" mt={4}>
              <Heading color="primary.500">Governor</Heading>
              <Text textAlign="center" my={4} maxW="xl">
                The main governor contract that takes care of all governance routines like handling
                a proposal, casting votes, sending execution to timelock, etc.
              </Text>
              <GovernorForm
                onSubmit={(data) => onDataSubmit('governor', data)}
                onPrevClick={() => prevStep()}
                w="full"
                maxW="xl"
              />
            </Card>
          </Step>

          <Step label="Launch">
            <Card display="flex" flexDirection="column" alignItems="center" mt={4}>
              {/* @ts-ignore */}
              <DaoLauncher params={params} />
            </Card>
          </Step>
        </Steps>
      </Flex>
    </WalletConnectedView>
  );
};

export default LauncherStepper;

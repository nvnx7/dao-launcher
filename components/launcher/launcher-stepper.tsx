import { Flex, FlexProps } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import TokenForm from './token-form';

const LauncherStepper: React.FC<FlexProps> = ({ ...props }) => {
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" width="100%" {...props}>
      <Steps
        activeStep={activeStep}
        onClickStep={(step: number) => setStep(step)}
        orientation="vertical"
      >
        <Step label="Token">
          <TokenForm onSubmit={() => {}} />
        </Step>
        <Step label="Timelock">Timelock</Step>
        <Step label="Governor">Governor</Step>
      </Steps>
    </Flex>
  );
};

export default LauncherStepper;

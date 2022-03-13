import type { NextPage } from 'next';
import Layout from 'components/common/layout/layout';
import LauncherStepper from 'components/launcher/launcher-stepper';
import { Center } from '@chakra-ui/react';

const Launcher: NextPage = () => {
  return (
    <Layout>
      <Center px={2} my={8}>
        <LauncherStepper maxW="4xl" />
      </Center>
    </Layout>
  );
};

export default Launcher;

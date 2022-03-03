import type { NextPage } from 'next';
import Layout from 'components/common/layout/layout';
import LauncherStepper from 'components/launcher/launcher-stepper';
import { Center } from '@chakra-ui/react';

const Launcher: NextPage = () => {
  return (
    <Layout>
      <Center px={16}>
        <LauncherStepper />
      </Center>
    </Layout>
  );
};

export default Launcher;

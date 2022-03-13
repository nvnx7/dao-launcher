import { Box, Button, Heading, StackProps, Text, VStack } from '@chakra-ui/react';
import LabelValuePair from 'components/common/label-value';
import { useUI } from 'contexts/ui';
import { defaultTo } from 'ramda';

const DaoDataDownloader: React.FC<StackProps> = ({ ...props }) => {
  const { modalData: transactions } = useUI();
  const { token, timelock, governor } = defaultTo({}, transactions);

  function handleClick() {
    let data = `Token\nAddress:${token.contractAddress}\nBlock Number:${
      token.blockNumber || '-'
    }\n`;
    data += `\nTimelock\nAddress:${timelock.contractAddress}\nBlock Number:${
      timelock.blockNumber || '-'
    }\n`;
    data += `\nGovernor\nAddress:${governor.contractAddress}\nBlock Number:${
      governor.blockNumber || '-'
    }\n`;
    const file = new Blob([data], { type: 'text/plain' });

    const el = document.createElement('a');
    el.href = URL.createObjectURL(file);
    el.download = 'doa.txt';
    document?.body.appendChild(el);
    el.click();
  }

  return (
    <VStack spacing={4} {...props}>
      <Heading color="primary.500">DAO Deployed!</Heading>
      <Text textAlign="center" fontWeight="bold">
        Download the addresses of contracts and other data below.
      </Text>
      <Box>
        <LabelValuePair label="Token" value={`${token?.contractAddress?.slice(0, 8)}...`} />
        <LabelValuePair label="Timelock" value={`${timelock?.contractAddress?.slice(0, 8)}...`} />
        <LabelValuePair label="Governor" value={`${governor?.contractAddress?.slice(0, 8)}...`} />
      </Box>

      <Button onClick={handleClick}>Download</Button>
    </VStack>
  );
};

export default DaoDataDownloader;

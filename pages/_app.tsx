import type { AppProps } from 'next/app';
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { colors, fonts, components } from 'theme';

const theme = extendTheme({
  colors,
  fonts,
  components,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

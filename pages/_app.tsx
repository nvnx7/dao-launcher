import type { AppProps } from 'next/app';
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { colors, fonts, components } from 'theme';
import AppContext from 'contexts';

const theme = extendTheme({
  colors,
  fonts,
  components,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </ChakraProvider>
  );
}

export default MyApp;

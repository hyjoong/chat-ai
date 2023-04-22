import Layout from '@/components/common/Layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global-style';

export default function App({ Component, pageProps }: AppProps) {
  useAuth();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

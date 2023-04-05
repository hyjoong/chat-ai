import GlobalStyle from '../styles/global-style';
import { theme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';

export const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  Story => {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    );
  },
];

import React, { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    blush: '#FBEAE4',
    peach: '#F8D7D0',
    forest: '#14251E',
    hunter: '#3A4D44',
    coral: '#FC9485',
    orange: '#FD8D2D',
  },
  font: {
    heading: 'Belgiano Serif, serif',
    body: 'Inter, Arial, sans-serif',
  },
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Belgiano Serif';
    src: url('/fonts/BelgianoSerif.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body {
    background: ${props => props.theme.colors.blush};
    color: ${props => props.theme.colors.forest};
    font-family: ${props => props.theme.font.body};
    margin: 0;
    min-height: 100vh;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.font.heading};
    color: ${props => props.theme.colors.forest};
    margin: 0;
  }
`;

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
);

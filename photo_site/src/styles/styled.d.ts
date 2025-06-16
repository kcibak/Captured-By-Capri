import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blush: string;
      peach: string;
      forest: string;
      hunter: string;
      coral: string;
      orange: string;
    };
    font: {
      heading: string;
      body: string;
    };
  }
}

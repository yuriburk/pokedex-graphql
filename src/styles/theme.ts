import { colors } from './colors';
import breakpoints from './breakpoints';

export const theme = {
  colors,
  breakpoints,
};

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

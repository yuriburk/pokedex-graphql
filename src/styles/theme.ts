import { colors, typesColors } from './colors';
import breakpoints from './breakpoints';

export const theme = {
  colors,
  typesColors,
  breakpoints,
};

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

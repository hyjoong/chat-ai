import { DefaultTheme } from 'styled-components';
import COLOR from './color';

export const breakpoints = {
  mobile: 428,
  tablet: 1024,
};

const colors = {
  primary: COLOR.SKY_BLUE,
  primaryDark: COLOR.DARK_BLUE,
  black900: COLOR.BLACK900,
  black800: COLOR.BLACK800,
  black700: COLOR.BLACK700,
  red: COLOR.RED,
  white: COLOR.WHITE,
  gray900: COLOR.GRAY900,
  gray800: COLOR.GRAY800,
  gray700: COLOR.GRAY700,
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};

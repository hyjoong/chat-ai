import styled, { css } from 'styled-components';
import { ITextProps } from './Text.types';

const TextSizes = {
  small: css`
    font-size: 16px;
  `,
  middle: css`
    font-size: 24px;
  `,
  large: css`
    font-size: 28px;
  `,
};

const TextColors = {
  white: css`
    color: ${({ theme }) => theme.colors.white};
  `,
  black: css`
    color: ${({ theme }) => theme.colors.black900};
  `,
  gray: css`
    color: ${({ theme }) => theme.colors.gray500};
  `,
  red: css`
    color: ${({ theme }) => theme.colors.red};
  `,
};

export const Container = styled.p<ITextProps>`
  margin: 8px 0;
  font-weight: ${({ isBold }) => (isBold ? 700 : 500)};
  text-decoration: ${({ isUnderline }) => (isUnderline ? 'underline' : 'none')};
  text-underline-position: under;
  ${({ size = 'middle' }) => TextSizes[size]}
  ${({ color = 'white' }) => TextColors[color]}
`;

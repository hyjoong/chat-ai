import { IButtonProps } from './Button.types';
import styled, { css } from 'styled-components';

const buttonSizes = {
  middle: css`
    padding: 10px 18px;
    font-size: 16px;
  `,
  large: css`
    width: 100%;
    padding: 25px;
    font-size: 24px;
  `,
};

const buttonVariants = {
  warning: css`
    background-color: ${({ theme }) => theme.colors.red};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
  `,
};

export const Container = styled.button<IButtonProps>`
  border-radius: 5px;
  font-weight: 600;
  line-height: 16px;
  transition: all 0.15s ease-in-out;
  color: ${({ theme }) => theme.colors.black900};

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }

  ${({ size = 'middle' }) => buttonSizes[size]}
  ${({ variant = 'primary' }) => buttonVariants[variant]}
`;

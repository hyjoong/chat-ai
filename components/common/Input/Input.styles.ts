import styled from 'styled-components';
import { IInputProps } from './Input.types';

export const Container = styled.input<IInputProps>`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
  border-width: 2px;
  border-color: ${({ isValid, theme }) =>
    isValid ? theme.colors.gray800 : theme.colors.red};
  border-style: solid;
  border-radius: 5px;
  padding: 20px;
  outline: none;
  transition: all 0.15s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray800};
  }
  &:focus {
    border-color: ${({ isValid, theme }) =>
      isValid ? theme.colors.white : theme.colors.red};
  }
`;

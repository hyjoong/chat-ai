import styled from 'styled-components';

export const Container = styled.input`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background: transparent;
  border: ${({ theme }) => `2px solid ${theme.colors.gray800}`};
  border-radius: 5px;
  padding: 20px;
  outline: none;
  transition: all 0.15s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray800};
  }
  &:focus {
    border: ${({ theme }) => `2px solid ${theme.colors.white}`};
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: 60px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray800}`};
  cursor: pointer;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray900};
    transition: background-color 0.2s ease-in-out;
  }

  button {
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }

  p {
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;

  border-radius: 5px;
  width: 100px;
  background-color: #ffffff;
  box-shadow: 0 3px 5px #0000001a;
`;

export const Wrapper = styled.div`
  padding: 5px 0;
`;
export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 4px;
`;

export const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  margin: 0 3px;
  user-select: none;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

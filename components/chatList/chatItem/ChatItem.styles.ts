import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: 60px;
  border: 1px solid white;

  box-shadow: 1px 1px 2px white;

  font-size: ;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 4px white;
  }
  button {
    &:hover {
      opacity: 0.8;
    }
  }
`;

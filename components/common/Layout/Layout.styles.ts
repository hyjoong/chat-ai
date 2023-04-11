import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black900};
  padding: 0 25px;
  margin: 0 auto;
`;

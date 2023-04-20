import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const logoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 200px 0 100px 0;
`;

export const ErrorMessageBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.red};
`;

export const KeyInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  p {
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.15s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

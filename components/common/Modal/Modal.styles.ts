import styled from 'styled-components';

export const Container = styled.div``;

export const Section = styled.div`
  position: absolute;
  top: 100px;
  padding: 20px 30px;
  width: 375px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 5px;

  .icon-box {
    display: flex;
    justify-content: flex-end;
    img {
      cursor: pointer;
    }
  }

  .input-field {
    margin-bottom: 30px;

    p {
      margin-bottom: 10px;
    }
  }
`;

export const ModalHeader = styled.div`
  img {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

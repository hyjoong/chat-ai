import styled from 'styled-components';

export const Container = styled.div``;

export const Section = styled.div`
  position: absolute;
  top: 100px;
  padding: 20px 30px;
  width: 382px;
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
  .input-field:first-child {
    margin-bottom: 30px;
  }
  .input-field {
    &.first {
      margin-bottom: 30px;
    }
    p {
      margin-bottom: 10px;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .error-message {
    height: 30px;
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
  height: 40px;

  button {
    &:not(:last-child) {
      margin-right: 10px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0 30px 0;
`;

export const ChatItemList = styled.div`
  max-height: 700px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    &:not(:last-child) {
      /* margin: 10px 0; */
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  width: 100%;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;

  p {
    margin: 4px auto;
  }
`;

export const MessageBox = styled.div`
  padding: 10px 12px;
  max-width: 200px;
  background-color: #fef01b;
  border-radius: 10px;
  line-height: 20px;
`;

export const Time = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  color: gray;
  font-weight: 600;
`;

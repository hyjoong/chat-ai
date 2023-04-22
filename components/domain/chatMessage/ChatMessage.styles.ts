import styled from 'styled-components';

export const Container = styled.div<{ isMine: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

export const Profile = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 10px;
`;

export const MessageBox = styled.div`
  padding: 10px 12px;
  width: 200px;
  background-color: #fef01b;
  border-radius: 15px;
  line-height: 20px;
`;

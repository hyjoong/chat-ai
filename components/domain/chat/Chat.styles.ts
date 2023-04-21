import styled from 'styled-components';
import Text from '@/components/common/Text';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  form {
    position: relative;

    button {
      position: absolute;
      top: 12px;
      right: 20px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray800}`};

  .header-left {
    display: flex;
    align-items: center;

    .header-info {
      display: flex;
      align-items: center;

      p:first-child {
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 20px;
      }
      p:last-child {
        margin-left: 10px;
      }
    }
  }

  .header-right {
    > div {
      top: 45px;
      right: 0;
    }
  }
`;

export const RoomCountText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  font-weight: 600;
`;

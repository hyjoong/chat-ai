import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import React from 'react';
import * as S from './ChatItem.styles';
import { IChatItemProps } from './ChatItem.types';

const ChatItem = ({ title, onClick }: IChatItemProps) => {
  return (
    <S.Container onClick={() => onClick('3')}>
      <Text size="middle"> {title}</Text>

      <Button variant="primary">수정</Button>
    </S.Container>
  );
};

export default ChatItem;

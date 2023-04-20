import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import * as S from './ChatItem.styles';
import { IChatItemProps } from './ChatItem.types';

const ChatItem = ({
  id,
  title,
  count,
  handleRoomClick,
  handleRoomEdit,
}: IChatItemProps) => {
  return (
    <S.Container onClick={() => handleRoomClick(id)}>
      <S.ChatInfo>
        <Image
          width="40"
          height="40"
          src={`/images/profile-multi${count}.png`}
          alt="chat-profile"
        />
        <Text size="middle"> {title}</Text>
      </S.ChatInfo>
      <Button
        onClick={event => handleRoomEdit(event, id, title, count)}
        variant="primary"
      >
        수정
      </Button>
    </S.Container>
  );
};

export default ChatItem;

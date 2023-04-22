import React from 'react';
import Image from 'next/image';
import Text from '@/components/common/Text';
import * as S from './ChatMessage.styles';
import { IChatMessageProps } from './ChatMessage.types';
import { NICKNAME_LIST } from '@constants/nickname';

const ChatMessage = ({ message, userId, displayTime }: IChatMessageProps) => {
  return (
    <S.Container isMine={userId === 0}>
      {userId !== 0 && (
        <S.Profile>
          <Image
            width={50}
            height={50}
            src={`/images/profile${userId}.png`}
            alt="profile"
          />
          <Text size="small" color="gray">
            {NICKNAME_LIST[userId]}
          </Text>
        </S.Profile>
      )}
      <div>
        <S.MessageBox>{message}</S.MessageBox>
        <S.Time>{displayTime}</S.Time>
      </div>
    </S.Container>
  );
};

export default ChatMessage;

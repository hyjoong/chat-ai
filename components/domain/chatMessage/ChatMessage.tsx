import Image from 'next/image';
import React from 'react';
import * as S from './ChatMessage.styles';
import { IChatMessageProps } from './ChatMessage.types';

const ChatMessage = ({ message, userId }: IChatMessageProps) => {
  return (
    <S.Container isMine={userId === 0}>
      <S.Profile>
        {userId !== 0 && (
          <Image
            width={50}
            height={50}
            src={`/images/profile${userId}.png`}
            alt="profile"
          />
        )}
      </S.Profile>
      <S.MessageBox>{message}</S.MessageBox>
    </S.Container>
  );
};

export default ChatMessage;

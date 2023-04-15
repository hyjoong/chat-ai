import { useRouter } from 'next/router';
import React, { useState } from 'react';
import IconButton from '../common/IconButton/IconButton';
import Modal from '../common/Modal';
import ChatItem from './chatItem/ChatItem';
import * as S from './ChatList.styles';

const ChatList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');

  const handleModal = (type?: 'new' | 'edit') => {
    setIsModalOpen(prev => !prev);
    if (type) {
      setModalType(type);
    }
  };

  const handleChatRoomClick = (chatRoomId: string) => {
    router.push(`/chat/${chatRoomId}`);
  };

  return (
    <S.Container>
      <div className="header">
        <IconButton
          iconUrl="./svgs/plus.svg"
          onClick={() => handleModal('new')}
        />
      </div>
      <div>
        <ChatItem title="채팅 방" onClick={handleChatRoomClick} />
      </div>
      {isModalOpen && <Modal type={modalType} handleModal={handleModal} />}
    </S.Container>
  );
};

export default ChatList;

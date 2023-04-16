import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IconButton from '../common/IconButton/IconButton';
import Modal from '../common/Modal';
import ChatItem from './chatItem/ChatItem';
import * as S from './ChatList.styles';
import { IChatProps } from './Chat.types';

const ChatList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');
  const [roomId, setRoomId] = useState(0);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [chatList, setChatList] = useState<IChatProps[]>([]);

  const handleChangeChatInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else {
      setCount(value);
    }
  };

  const handleModalClose = () => {
    setTitle('');
    setCount('');
    setIsModalOpen(false);
  };

  const handleModalOpen = (type: 'new' | 'edit') => {
    setIsModalOpen(true);
    setModalType(type);
  };

  useEffect(() => {
    const storedChatList = localStorage.getItem('chatList');
    if (storedChatList) {
      setChatList(JSON.parse(storedChatList));
    }
  }, []);

  const createChatRoom = () => {
    const newCount = Number(count);
    if (isNaN(newCount)) {
      alert('인원수는 2~5 사이로 입력해주세요.');
      return;
    }
    if (newCount < 2 || 5 < newCount) {
      alert('인원수는 2~5 사이로 입력해주세요.');
      return;
    }
    const newChatList = [...chatList];
    newChatList.push({ id: new Date().getTime(), title, count });
    setChatList(newChatList);
    localStorage.setItem('chatList', JSON.stringify(newChatList));
    setIsModalOpen(false);
  };

  const handleRoomClick = (roomId: number) => {
    router.push(`/chat/${roomId}`);
  };

  const handleRoomEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
    title: string,
    count: string,
  ) => {
    event.stopPropagation();
    setRoomId(id);
    setTitle(title);
    setCount(count);
    handleModalOpen('edit');
  };

  const handleRoomEditApply = (id: number, title: string, count: string) => {
    const storedChatList = localStorage.getItem('chatList');

    if (storedChatList) {
      const chatList = JSON.parse(storedChatList);
      const newChatList = chatList.map((chatRoom: IChatProps) => {
        if (chatRoom.id === id) {
          return {
            ...chatRoom,
            title: title,
            count: count,
          };
        } else {
          return chatRoom;
        }
      });

      setChatList(newChatList);
      localStorage.setItem('chatList', JSON.stringify(newChatList));
    }

    setIsModalOpen(false);
  };

  return (
    <S.Container>
      <S.Header>
        <IconButton
          iconUrl="./svgs/plus.svg"
          onClick={() => handleModalOpen('new')}
        />
      </S.Header>
      <S.ChatItemList>
        {chatList.map(room => (
          <ChatItem
            key={room.id}
            id={room.id}
            title={room.title}
            count={room.count}
            handleRoomClick={handleRoomClick}
            handleRoomEdit={handleRoomEdit}
          />
        ))}
      </S.ChatItemList>
      {isModalOpen && (
        <Modal
          id={roomId}
          title={title}
          count={count}
          type={modalType}
          handleChangeChatInfo={handleChangeChatInfo}
          handleModalClose={handleModalClose}
          createChatRoom={createChatRoom}
          handleRoomEditApply={handleRoomEditApply}
        />
      )}
    </S.Container>
  );
};

export default ChatList;

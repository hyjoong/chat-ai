import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@/components/common/IconButton/IconButton';
import Modal from '@/components/common/Modal';
import ChatItem from '../chatItem/ChatItem';
import Text from '@/components/common/Text';
import * as S from './ChatList.styles';
import { IChatProps } from './Chat.types';
import { validateRoomCount } from 'utils/modalInputValidation';

const ChatList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');
  const [roomId, setRoomId] = useState(0);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [chatList, setChatList] = useState<IChatProps[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeChatInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
    } else {
      setCount(value);
    }
    if (!isValid) {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  const handleModalClose = () => {
    setTitle('');
    setCount('');
    setIsValid(true);
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

  const createChatRoom = useCallback(() => {
    const isValid = validateRoomCount(count);
    if (!isValid) {
      setErrorMessage('2~5명의 인원수를 입력해주세요.');
      setIsValid(false);
      return;
    }

    const newChatList = [...chatList];
    newChatList.push({ id: new Date().getTime(), title, count });
    setChatList(newChatList);
    localStorage.setItem('chatList', JSON.stringify(newChatList));
    setTitle('');
    setCount('');
    setIsModalOpen(false);
  }, [chatList, count, title]);

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
    const isValid = validateRoomCount(count);
    if (!isValid) {
      setErrorMessage('2~5명의 인원수를 입력해주세요.');
      setIsValid(false);
      return;
    }
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

  const handleRoomDelete = (roomId: number) => {
    if (window.confirm('채팅방에서 나가시겠습니까?')) {
      const storedChatList = localStorage.getItem('chatList');
      if (storedChatList) {
        const chatList = JSON.parse(storedChatList);
        const newChatList = chatList.filter(
          (chatRoom: IChatProps) => chatRoom.id !== roomId,
        );
        setChatList(newChatList);
        localStorage.setItem('chatList', JSON.stringify(newChatList));
      }
      setIsModalOpen(false);
    }
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
        {chatList.length === 0 ? (
          <Text size="large"> 대화 가능한 채팅방이 없습니다</Text>
        ) : (
          chatList.map(room => (
            <ChatItem
              key={room.id}
              id={room.id}
              title={room.title}
              count={room.count}
              handleRoomClick={handleRoomClick}
              handleRoomEdit={handleRoomEdit}
            />
          ))
        )}
      </S.ChatItemList>
      {isModalOpen && (
        <Modal
          id={roomId}
          title={title}
          count={count}
          type={modalType}
          isValid={isValid}
          errorMessage={errorMessage}
          handleChangeChatInfo={handleChangeChatInfo}
          handleModalClose={handleModalClose}
          createChatRoom={createChatRoom}
          handleRoomEditApply={handleRoomEditApply}
          handleRoomDelete={handleRoomDelete}
        />
      )}
    </S.Container>
  );
};

export default ChatList;

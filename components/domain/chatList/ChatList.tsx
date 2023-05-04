import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@/components/common/IconButton/IconButton';
import Modal from '@/components/common/Modal';
import ChatItem from '../chatItem/ChatItem';
import Text from '@/components/common/Text';
import * as S from './ChatList.styles';
import { IChatProps, TModalType } from './ChatList.types';
import { validateRoomCount } from 'utils/modalInputValidation';
import {
  removeChatRoom,
  getChatList,
  updateChatInfoById,
  setChatRoomList,
} from 'storage/service';
import {
  CHAT_MEMBER_RANGE_MESSAGE,
  LEAVE_CHATROOM_CONFIRM_MESSAGE,
  NO_CHAT_ROOM_LIST_MESSAGE,
} from '@constants/constants';
import { useBooleanState } from '@/hooks/useBooleanState';

const ChatList = () => {
  const router = useRouter();
  const [modalType, setModalType] = useState<TModalType>('new');
  const [roomId, setRoomId] = useState(0);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [chatList, setChatList] = useState<IChatProps[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, openModal, closeModal, toggleModal] =
    useBooleanState(false);

  const getChatData = () => {
    const chatData = getChatList();
    if (chatData) {
      setChatList(chatData);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

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
    closeModal();
    setErrorMessage('');
  };

  const handleModalOpen = (type: TModalType) => {
    openModal();
    setModalType(type);
  };

  const createChatRoom = useCallback(() => {
    const isValid = validateRoomCount(count);
    if (!isValid) {
      setErrorMessage(CHAT_MEMBER_RANGE_MESSAGE);
      setIsValid(false);
      return;
    }

    const newChatList = [...chatList];
    newChatList.push({ id: new Date().getTime(), title, count });
    setChatList(newChatList);
    setChatRoomList(newChatList);
    setTitle('');
    setCount('');
    closeModal();
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
      setErrorMessage(CHAT_MEMBER_RANGE_MESSAGE);
      setIsValid(false);
      return;
    }

    const updatedChatInfo = updateChatInfoById(title, count, id);
    if (updatedChatInfo) {
      setChatList(updatedChatInfo);
    }

    closeModal();
  };
  const handleRoomDelete = (roomId: number) => {
    if (window.confirm(LEAVE_CHATROOM_CONFIRM_MESSAGE)) {
      const response = removeChatRoom(roomId);
      if (response) setChatList(response);

      closeModal();
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
          <Text size="large"> {NO_CHAT_ROOM_LIST_MESSAGE}</Text>
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

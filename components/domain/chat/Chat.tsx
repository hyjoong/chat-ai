import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useOutsideClick from '@/hooks/useOutsideClick';
import Dropdown from '../../common/Dropdown/Dropdown';
import IconButton from '../../common/IconButton/IconButton';
import Input from '../../common/Input';
import Text from '../../common/Text';
import * as S from './Chat.styles';
import Modal from '../../common/Modal';
import { validateRoomCount } from 'utils/modalInputValidation';
import {
  getChatRoomById,
  getOpenApiKey,
  removeChatRoom,
  updateChatInfoById,
} from 'storage/service';
import getCurrentTime from 'utils/getCurrentTime';
import ChatMessage from '../chatMessage/ChatMessage';

interface Props {
  roomId: string;
}

const TYPING_STATUS_MESSAGE = '상대방이 메시지를 입력 중입니다...';
const OPTION_LIST = ['방 수정', '나가기'];

const Chat = ({ roomId }: Props) => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: type 지정
  const [chatData, setChatData] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingCount, setEditingCount] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  const dropdownRef = useOutsideClick<HTMLDivElement>(handleDropdown);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsValid(true);
    setErrorMessage('');
  };

  const handleChangeChatInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setEditingTitle(value);
    } else {
      setEditingCount(value);
    }
    if (!isValid) {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  const handleOptionSelect = (option: string) => {
    switch (option) {
      case '방 수정':
        setIsModalOpen(true);
        setIsDropdownOpen(false);
        return;
      case '나가기':
        handleRoomDelete(parseInt(roomId));
    }
    setIsDropdownOpen(false);
  };

  const handleRoomEditApply = (id: number) => {
    const isValid = validateRoomCount(editingCount);
    if (!isValid) {
      setErrorMessage('2~5명의 인원수를 입력해주세요.');
      setIsValid(false);
      return;
    }

    const updatedChatInfo = updateChatInfoById(editingTitle, editingCount, id);
    if (updatedChatInfo) {
      setTitle(editingTitle);
      setCount(editingCount);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const chatData = getChatRoomById(parseInt(roomId));
    const apiKeyData = getOpenApiKey();

    if (chatData) {
      setTitle(chatData.title);
      setEditingTitle(chatData.title);
      setCount(chatData.count);
      setEditingCount(chatData.count);
    }
    if (apiKeyData) {
      setApiKey(apiKeyData);
    }
  }, []);

  useEffect(() => {
    const storedChatData = localStorage.getItem(`chatData_${roomId}`);
    if (storedChatData) {
      setChatData(JSON.parse(storedChatData));
    }
  }, [roomId]);

  const getRandomNumber = () => {
    // 랜덤 숫자를 반환해야 하지만 제일 마지막에 전송한 유저의 id는 겹치지 않아야한다.
    const roomCount = parseInt(count);
    const randomNumber = Math.floor(Math.random() * (roomCount - 1)) + 1;
    return randomNumber === roomCount ? roomCount - 1 : randomNumber;
  };

  const handleSendMessage = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message === '' || isLoading) return;
    setIsLoading(true);
    setMessage('');
    saveChatData(message, true);

    try {
      const response = await fetch(
        `/api/chat?sentence=${encodeURIComponent(message)}&apiKey=${apiKey}`,
      );
      const { data } = await response.json();

      saveChatData(data, false);
    } catch (error) {
      console.error('Failure in getting chatting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }, [isLoading]);

  const messageListRef = useRef<HTMLDivElement>(null);

  // TODO: 채팅 데이터 저장 로직 분리
  const saveChatData = (chatData: string, isMyChat: boolean) => {
    const storedChatData = localStorage.getItem(`chatData_${roomId}`);

    const chatItem = {
      id: roomId,
      message: chatData,
      time: new Date(),
      displayTime: getCurrentTime(),
      userId: isMyChat ? 0 : getRandomNumber(),
      // ai인지 판단하는 boolean or 1~인원수 랜덤숫자 부여
    };

    if (storedChatData) {
      const existingChatData = JSON.parse(storedChatData);

      const newChatData = [...existingChatData, chatItem];
      localStorage.setItem(`chatData_${roomId}`, JSON.stringify(newChatData));
      setChatData(newChatData);
    } else {
      localStorage.setItem(`chatData_${roomId}`, JSON.stringify([chatItem]));
      setChatData([chatItem]);
    }
  };

  const handleRoomDelete = (roomId: number) => {
    if (window.confirm('채팅방에서 나가시겠습니까?')) {
      const isSuccess = removeChatRoom(roomId);
      if (isSuccess) router.back();
      setIsModalOpen(false);
    }
  };

  return (
    <S.Container>
      <div>
        <S.Header>
          <div className="header-left">
            <IconButton
              onClick={() => router.back()}
              iconUrl="/svgs/arrow-back.svg"
            />
            <div className="header-info">
              <Text>{title}</Text>
              <Text size="small" color="gray">
                {count}
              </Text>
            </div>
          </div>
          <div className="header-right">
            <IconButton
              iconUrl="/svgs/three-dots.svg"
              onClick={handleDropdown}
            />
            {isDropdownOpen && (
              <Dropdown
                ref={dropdownRef}
                options={OPTION_LIST}
                handleOptionSelect={handleOptionSelect}
              />
            )}
          </div>
        </S.Header>
        <S.ChatMessageList ref={messageListRef}>
          {chatData.map(item => (
            <ChatMessage
              userId={item.userId}
              key={item.time}
              message={item.message}
              displayTime={item.displayTime}
            />
          ))}
        </S.ChatMessageList>
      </div>
      <div>
        {isLoading && (
          <Text size="small" color="gray" isBold={true}>
            {TYPING_STATUS_MESSAGE}
          </Text>
        )}
        <form onSubmit={handleSendMessage}>
          <Input
            placeholder="입력해주세요."
            onChange={handleInputChange}
            value={message}
          ></Input>
          <IconButton iconUrl="/svgs/send.svg" />
        </form>
      </div>
      {isModalOpen && (
        <Modal
          id={parseInt(roomId)}
          title={title}
          count={count}
          type="edit"
          isValid={isValid}
          errorMessage={errorMessage}
          handleModalClose={handleModalClose}
          handleRoomEditApply={handleRoomEditApply}
          handleChangeChatInfo={handleChangeChatInfo}
        />
      )}
    </S.Container>
  );
};

export default Chat;

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
  getLastMessageFromChatData,
  getLastUserId,
  getOpenApiKey,
  removeChatRoom,
  updateChatInfoById,
} from 'storage/service';
import getCurrentTime from 'utils/getCurrentTime';
import ChatMessage from '../chatMessage/ChatMessage';
import {
  API_FAIL_ROOM_MESSAGE,
  API_KEY_LIMIT_EXCEEDED,
  CHAT_MEMBER_RANGE_MESSAGE,
  DROPDOWN_OPTION_LIST,
  LEAVE_CHATROOM_CONFIRM_MESSAGE,
  NO_CHAT_ROOM_MESSAGE,
  RESPONSE_TIME_LIMIT,
  TYPING_STATUS_MESSAGE,
} from '@constants/constants';
import { IChatData, IChatProps, TOptionSelect } from './Chat.types';
import { useBooleanState } from '@/hooks/useBooleanState';

const Chat = ({ roomId }: IChatProps) => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatData, setChatData] = useState<IChatData[]>([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingCount, setEditingCount] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [roomErrorMessage, setRoomErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const [isModalOpen, openModal, closeModal, toggleModal] =
    useBooleanState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  const dropdownRef = useOutsideClick<HTMLDivElement>(handleDropdown);

  const handleModalClose = () => {
    closeModal();
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

  const handleOptionSelect = (option: TOptionSelect) => {
    switch (option) {
      case '방 수정':
        openModal();
        setIsDropdownOpen(false);
        break;
      case '나가기':
        handleRoomDelete(parseInt(roomId));
        break;
      default:
        console.error(`Invalid option: ${option}`);
        break;
    }
    setIsDropdownOpen(false);
  };

  const handleRoomEditApply = (id: number) => {
    const isValid = validateRoomCount(editingCount);
    if (!isValid) {
      setErrorMessage(CHAT_MEMBER_RANGE_MESSAGE);
      setIsValid(false);
      return;
    }

    const updatedChatInfo = updateChatInfoById(editingTitle, editingCount, id);
    if (updatedChatInfo) {
      setTitle(editingTitle);
      setCount(editingCount);
      closeModal();
    }
  };

  useEffect(() => {
    const chatData = getChatRoomById(parseInt(roomId));
    const apiKeyData = getOpenApiKey();
    if (chatData === undefined) {
      setRoomErrorMessage(NO_CHAT_ROOM_MESSAGE);
      return;
    }
    setTitle(chatData.title);
    setEditingTitle(chatData.title);
    setCount(chatData.count);
    setEditingCount(chatData.count);

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

  useEffect(() => {
    if (!isMessageSent) return;
    if (!roomId) return;
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalId);
      const lastMessage = getLastMessageFromChatData(roomId);
      handleSendMessage(lastMessage, false);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, isMessageSent]);

  const getRandomNumber = (lastUserId: number) => {
    const roomCount = parseInt(count);

    if (roomCount === 2) {
      return 1;
    }
    let randomNumber = Math.floor(Math.random() * (roomCount - 1)) + 1;
    if (randomNumber === lastUserId) {
      randomNumber = (randomNumber % roomCount) + 1;
    }
    return randomNumber;
  };

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSendMessage(message, true);
  };

  const handleSendMessage = async (sentence: string, isMyChat: boolean) => {
    if (sentence === '' || isLoading) return;
    setIsLoading(true);
    setMessage('');
    const lastUserId = getLastUserId(roomId);
    if (isMyChat) saveChatData(sentence, lastUserId, isMyChat);
    setIsMessageSent(false);

    const messageTexts = chatData.slice(-5).map(item => item.message);

    try {
      const response = await fetch(
        `/api/chat?sentence=${encodeURIComponent(
          sentence,
        )}&apiKey=${apiKey}&roomCount=${count}&messageTexts=${messageTexts}`,
      );

      if (response?.status === 401) {
        alert(API_KEY_LIMIT_EXCEEDED);
        localStorage.removeItem('apiKey');
        router.push('/login');
      }
      const { data } = await response.json();

      saveChatData(data.message.content, lastUserId, false);
      setTimeLeft(RESPONSE_TIME_LIMIT);
      setIsMessageSent(true);
    } catch (error) {
      setRoomErrorMessage(API_FAIL_ROOM_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }, [isLoading]);

  const messageListRef = useRef<HTMLDivElement>(null);

  // TODO: 채팅 데이터 저장 로직 분리
  const saveChatData = (
    chatData: string,
    lastUserId: number,
    isMyChat: boolean,
  ) => {
    const storedChatData = localStorage.getItem(`chatData_${roomId}`);
    const chatItem: IChatData = {
      id: roomId,
      message: chatData,
      time: new Date(),
      displayTime: getCurrentTime(),
      userId: isMyChat ? 0 : getRandomNumber(lastUserId),
      role: isMyChat ? 'user' : 'assistant',
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
    if (window.confirm(LEAVE_CHATROOM_CONFIRM_MESSAGE)) {
      const isSuccess = removeChatRoom(roomId);
      if (isSuccess) router.back();
      closeModal();
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
                options={DROPDOWN_OPTION_LIST}
                handleOptionSelect={handleOptionSelect}
              />
            )}
          </div>
        </S.Header>
        {roomErrorMessage !== '' ? (
          <Text>{roomErrorMessage}</Text>
        ) : (
          <>
            <S.ChatMessageList ref={messageListRef}>
              {chatData.map((item, index) => (
                <ChatMessage
                  userId={item.userId}
                  key={item.message + index}
                  message={item.message}
                  displayTime={item.displayTime}
                />
              ))}
            </S.ChatMessageList>
          </>
        )}
      </div>
      <div>
        {isLoading && (
          <Text size="small" color="gray" isBold={true}>
            {TYPING_STATUS_MESSAGE}
          </Text>
        )}
        <form onSubmit={onSubmit}>
          <Input
            placeholder="입력해주세요."
            onChange={handleInputChange}
            value={message}
            disabled={roomErrorMessage !== ''}
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
          handleRoomDelete={handleRoomDelete}
        />
      )}
    </S.Container>
  );
};

export default Chat;

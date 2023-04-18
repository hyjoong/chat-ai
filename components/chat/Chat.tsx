import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useOutsideClick from 'hooks/useOutsideClick';
import Dropdown from '../common/Dropdown/Dropdown';
import IconButton from '../common/IconButton/IconButton';
import Input from '../common/Input';
import Text from '../common/Text';
import * as S from './Chat.styles';
import Modal from '../common/Modal';
import { IChatProps } from '../chatList/Chat.types';

interface Props {
  roomId: string;
}

const Chat = ({ roomId }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: type 지정
  const [chatData, setChatData] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [tempCount, setTempCount] = useState('');

  const handleChangeChatInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTempTitle(value);
    } else {
      setTempCount(value);
    }
  };

  const router = useRouter();

  const handleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  const dropdownRef = useOutsideClick<HTMLDivElement>(handleDropdown);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOptionSelect = (option: string) => {
    switch (option) {
      case '방 수정':
        setIsModalOpen(true);
      case '나가기':
    }
    setIsDropdownOpen(false);
  };

  const handleRoomEditApply = (id: number) => {
    const storedChatList = localStorage.getItem('chatList');

    if (storedChatList) {
      const chatList = JSON.parse(storedChatList);
      const newChatList = chatList.map((chatRoom: IChatProps) => {
        if (chatRoom.id == id) {
          return {
            ...chatRoom,
            title: tempTitle,
            count: tempCount,
          };
        } else {
          return chatRoom;
        }
      });

      localStorage.setItem('chatList', JSON.stringify(newChatList));
    }

    setTitle(tempTitle);
    setCount(tempCount);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedChatList = localStorage.getItem('chatList');

    if (storedChatList) {
      const chatRoom = JSON.parse(storedChatList);

      const nowChatRoom = chatRoom.find(
        (chat: IChatProps) => chat.id === parseInt(roomId),
      );
      setTitle(nowChatRoom?.title);
      setTempTitle(nowChatRoom?.title);
      setCount(nowChatRoom?.count);
      setTempCount(nowChatRoom?.count);
    }
  }, []);

  useEffect(() => {
    const storedChatData = localStorage.getItem(`chatData_${roomId}`);

    if (storedChatData) {
      setChatData(JSON.parse(storedChatData));
    } else {
      setChatData([]);
    }
  }, [roomId]);

  return (
    <S.Container>
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
          <IconButton iconUrl="/svgs/three-dots.svg" onClick={handleDropdown} />
          {isDropdownOpen && (
            <Dropdown
              ref={dropdownRef}
              options={OPTION_LIST}
              handleOptionSelect={handleOptionSelect}
            />
          )}
        </div>
      </S.Header>
      <label>
        <Input placeholder="입력해주세요."></Input>
        <IconButton iconUrl="/svgs/send.svg" />
      </label>
      {isModalOpen && (
        <Modal
          id={parseInt(roomId)}
          title={title}
          count={count}
          type="edit"
          handleModalClose={handleModalClose}
          handleRoomEditApply={handleRoomEditApply}
          handleChangeChatInfo={handleChangeChatInfo}
        />
      )}
    </S.Container>
  );
};

const OPTION_LIST = ['방 수정', '나가기'];

export default Chat;

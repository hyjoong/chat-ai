import useOutsideClick from 'hooks/useOutsideClick';
import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Text from '../Text';
import * as S from './Modal.styles';
import { IModalProps } from './Modal.types';

const Modal = ({ type, handleModal }: IModalProps) => {
  const [roomName, setRoomName] = useState('');
  const [roomCount, setRoomCount] = useState('');

  // 1. id를 props로 받아서 storage 에서 방이름, 인원수 가져옴
  // 2. 모달창을 open할 떄 props로 roomName, roomCount 값을 전달해서 받아옴.

  const modalRef = useOutsideClick(handleModal);

  return (
    <S.Container>
      <S.Section ref={modalRef}>
        <div className="icon-box" onClick={handleModal}>
          <img src="./svgs/x.svg" alt="xIcon" />
        </div>

        <div className="input-field">
          <Text isBold={true}>방 이름</Text>
          <Input
            onChange={e => setRoomName(e.target.value)}
            placeholder="방이름을 입력하세요."
          />
        </div>
        <div className="input-field">
          <Text isBold={true}>방 인원</Text>
          <Input
            onChange={e => setRoomCount(e.target.value)}
            placeholder="인원수를 입력하세요."
          />
        </div>
        <S.ButtonBox>
          {type === 'new' ? (
            <Button>생성</Button>
          ) : (
            <>
              <Button variant="warning" size="middle">
                삭제
              </Button>
              <Button variant="primary" size="middle">
                수정
              </Button>
            </>
          )}
        </S.ButtonBox>
      </S.Section>
    </S.Container>
  );
};

export default Modal;

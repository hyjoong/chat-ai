import React from 'react';
import Button from '../Button';
import Input from '../Input';
import Text from '../Text';
import * as S from './Modal.styles';
import { IModalProps } from './Modal.types';
import useOutsideClick from 'hooks/useOutsideClick';

const Modal = ({
  id,
  title,
  count,
  type,
  isValid,
  errorMessage,
  handleChangeChatInfo,
  handleModalClose,
  createChatRoom,
  handleRoomDelete,
  handleRoomEditApply,
}: IModalProps) => {
  const modalRef = useOutsideClick<HTMLDivElement>(handleModalClose);

  return (
    <S.Container>
      <S.Section ref={modalRef}>
        <div className="icon-box" onClick={handleModalClose}>
          <img src="./svgs/x.svg" alt="xIcon" />
        </div>

        <div className="input-field first">
          <Text isBold={true}>방 이름</Text>
          <Input
            name="title"
            onChange={handleChangeChatInfo}
            placeholder="방이름을 입력하세요."
            defaultValue={title}
          />
        </div>
        <div className="input-field">
          <Text isBold={true}>방 인원</Text>
          <Input
            name="count"
            onChange={handleChangeChatInfo}
            placeholder="인원수를 입력하세요."
            type="number"
            isValid={isValid}
            defaultValue={count}
          />
        </div>
        <div className="error-message">
          <Text size="small" color="red">
            {errorMessage}
          </Text>
        </div>

        <S.ButtonBox>
          {type === 'new' ? (
            <Button
              onClick={createChatRoom}
              disabled={title === '' || count === ''}
            >
              생성
            </Button>
          ) : (
            <>
              <Button
                variant="warning"
                size="middle"
                onClick={() => handleRoomDelete?.(id)}
              >
                삭제
              </Button>
              <Button
                variant="primary"
                size="middle"
                onClick={() => handleRoomEditApply(id, title, count)}
              >
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

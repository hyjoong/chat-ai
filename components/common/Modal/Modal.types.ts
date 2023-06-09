import { ChangeEvent } from 'react';
export interface IModalProps {
  type: 'new' | 'edit';
  id: number;
  title: string;
  count: string;
  isValid: boolean;
  errorMessage: string;
  handleChangeChatInfo: (event: ChangeEvent<HTMLInputElement>) => void;
  handleModalClose: () => void;
  createChatRoom?: () => void;
  handleRoomDelete?: (roomId: number) => void;
  handleRoomEditApply: (
    roomId: number,
    roomTitle: string,
    roomCount: string,
  ) => void;
}

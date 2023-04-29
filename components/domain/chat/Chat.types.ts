export interface IChatProps {
  roomId: string;
}

export interface IChatData {
  displayTime: string;
  id: string;
  message: string;
  role: 'user' | 'assistant';
  time: Date;
  userId: number;
}
export type TOptionSelect = '방 수정' | '나가기';

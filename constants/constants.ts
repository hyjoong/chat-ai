import { TOptionSelect } from '@/components/domain/chat/Chat.types';

export const NICKNAME_LIST = ['', 'Sally', 'Jacob', 'Tomas', 'Bob'];
export const DROPDOWN_OPTION_LIST: TOptionSelect[] = ['방 수정', '나가기'];

export const NO_CHAT_ROOM_LIST_MESSAGE = '대화 가능한 채팅방이 없습니다';
export const NO_CHAT_ROOM_MESSAGE = '채팅방을 찾을 수 없습니다.';
export const API_FAIL_ROOM_MESSAGE =
  'API 통신 중 오류가 발생했습니다.\n채팅 리스트 페이지로 이동하여\n다시 채팅방에 접속해주세요.';
export const API_KEY_LIMIT_EXCEEDED =
  'API KEY 사용량이 초과되었습니다. 다른 유효한 API KEY를 사용하여 로그인해 주세요.';
export const RESPONSE_TIME_LIMIT = 15;
export const MIN_CHAT_MEMBERS = 2;
export const MAX_CHAT_MEMBERS = 5;
export const CHAT_MEMBER_RANGE_MESSAGE = `${MIN_CHAT_MEMBERS}~${MAX_CHAT_MEMBERS}명의 인원수를 입력해주세요.`;
export const LEAVE_CHATROOM_CONFIRM_MESSAGE = '채팅방에서 나가시겠습니까?';
export const TYPING_STATUS_MESSAGE = '상대방이 메시지를 입력 중입니다...';

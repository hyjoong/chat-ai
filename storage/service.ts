import { IChatProps } from '@/components/domain/chatList/Chat.types';
import { getItem, setItem } from './storage';
import { StorageKey } from './storageKey';

export const getChatList = () => {
  return getItem(StorageKey.CHAT_LIST);
};

export const removeChatRoom = (chatId: number) => {
  const storedChatList = getItem(StorageKey.CHAT_LIST);
  const filteredChatList = storedChatList.filter(
    (chatRoom: IChatProps) => chatRoom.id !== chatId,
  );
  setItem(StorageKey.CHAT_LIST, filteredChatList);
  return filteredChatList;
};

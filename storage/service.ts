import { IChatProps } from '@/components/domain/chatList/ChatList.types';
import { getItem, setItem } from './storage';
import { StorageKey } from './storageKey';

export const getChatList = () => {
  return getItem(StorageKey.CHAT_LIST);
};

export const getChatRoomById = (chatId: number) => {
  const storedChatList = getItem(StorageKey.CHAT_LIST);
  if (!storedChatList) return;
  const findedChatRoom = storedChatList.find(
    (chat: IChatProps) => chat.id === chatId,
  );
  return findedChatRoom;
};

export const updateChatInfoById = (
  title: string,
  count: string,
  chatId: number,
) => {
  const storedChatList = getItem(StorageKey.CHAT_LIST);
  if (!storedChatList) return;
  const updatedChatList = storedChatList.map((chatRoom: IChatProps) => {
    if (chatRoom.id == chatId) {
      return {
        ...chatRoom,
        title,
        count,
      };
    } else {
      return chatRoom;
    }
  });
  setItem(StorageKey.CHAT_LIST, updatedChatList);
  return updatedChatList;
};

export const removeChatRoom = (chatId: number) => {
  const storedChatList = getItem(StorageKey.CHAT_LIST);
  if (!storedChatList) return;
  const filteredChatList = storedChatList.filter(
    (chatRoom: IChatProps) => chatRoom.id !== chatId,
  );
  setItem(StorageKey.CHAT_LIST, filteredChatList);
  return filteredChatList;
};

export const setOpenApiKey = (apiKey: string) => {
  setItem(StorageKey.API_KEY, apiKey);
};

export const getOpenApiKey = () => {
  return getItem(StorageKey.API_KEY);
};

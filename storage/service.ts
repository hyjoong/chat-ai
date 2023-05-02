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

export const setChatRoomList = (chatList: IChatProps[]) => {
  setItem(StorageKey.CHAT_LIST, chatList);
};

export const getOpenApiKey = () => {
  return getItem(StorageKey.API_KEY);
};

export const getLastMessageFromChatData = (roomId: string) => {
  const storedChatData = localStorage.getItem(`chatData_${roomId}`);
  if (!storedChatData) return;
  return JSON.parse(storedChatData)?.at(-1)?.message;
};

export const getLastUserId = (roomId: string) => {
  const storedChatData = localStorage.getItem(`chatData_${roomId}`);
  if (!storedChatData) return 0;
  return JSON.parse(storedChatData).at(-1).userId;
};

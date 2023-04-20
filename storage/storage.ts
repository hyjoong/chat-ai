import { IChatProps } from '@/components/domain/chatList/Chat.types';
import { StorageKey } from './storageKey';

export const getItem = (key: StorageKey) => {
  const storedChatList = localStorage.getItem(key);
  if (storedChatList) {
    return JSON.parse(storedChatList);
  } else {
    return null;
  }
};

export const setItem = (key: StorageKey, value: IChatProps[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error while saving to local storage:', error);
  }
};

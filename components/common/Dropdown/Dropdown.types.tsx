import { TOptionSelect } from '@/components/domain/chat/Chat.types';
import { Ref } from 'react';

export interface IDropdownProps {
  options: TOptionSelect[];
  handleOptionSelect: (option: TOptionSelect) => void;
  ref: Ref<HTMLDivElement>;
}

import { ReactNode } from 'react';

export interface ITextProps {
  size?: 'small' | 'middle' | 'large';
  color?: 'white' | 'black' | 'gray' | 'red';
  isUnderline?: boolean;
  isBold?: boolean;
  children: ReactNode;
}

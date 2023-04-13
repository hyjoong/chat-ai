import { ReactNode } from 'react';

export interface ITextProps {
  size?: 'small' | 'middle' | 'large';
  color?: 'white' | 'black';
  isUnderline?: boolean;
  isBold?: boolean;
  children: ReactNode;
}

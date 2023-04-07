import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  size?: 'middle' | 'large';
  variant?: 'primary' | 'warning';
}

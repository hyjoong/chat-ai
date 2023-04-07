import { PropsWithChildren } from 'react';
import * as S from './Button.styles';
import { IButtonProps } from './Button.types';

const Button = ({
  size = 'middle',
  variant = 'primary',
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return (
    <S.Container size={size} variant={variant} {...props}>
      {children}
    </S.Container>
  );
};

export default Button;

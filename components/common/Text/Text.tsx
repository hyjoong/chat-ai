import React from 'react';
import * as S from './Text.styles';
import { ITextProps } from './Text.types';

const Text = ({
  size = 'middle',
  color = 'white',
  isUnderline = false,
  isBold = false,
  children,
}: ITextProps) => {
  return (
    <S.Container
      size={size}
      color={color}
      isUnderline={isUnderline}
      isBold={isBold}
    >
      {children}
    </S.Container>
  );
};

export default Text;

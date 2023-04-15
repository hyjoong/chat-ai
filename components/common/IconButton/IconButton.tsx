import React from 'react';
import { IIconButtonProps } from './IconButton.types';
import * as S from './IconButton.styles';

const IconButton = ({ iconUrl, ...props }: IIconButtonProps) => {
  return (
    <S.Container {...props}>
      <img src={iconUrl} alt="icon" />
    </S.Container>
  );
};

export default IconButton;

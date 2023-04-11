import React from 'react';
import * as S from './Input.styles';
import { IInputProps } from './Input.types';

const Input = ({ ...props }: IInputProps) => {
  return <S.Container {...props} />;
};

export default Input;

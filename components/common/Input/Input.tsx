import React from 'react';
import * as S from './Input.styles';
import { IInputProps } from './Input.types';

const Input = ({ isValid = true, ...props }: IInputProps) => {
  return <S.Container isValid={isValid} {...props} />;
};

export default Input;

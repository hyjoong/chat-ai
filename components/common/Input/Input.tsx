import React from 'react';
import * as S from './Input.styles';
import { IInputProps } from './Input.types';

const Input = ({
  isValid = true,
  textAlign = 'left',
  ...props
}: IInputProps) => {
  return <S.Container isValid={isValid} textAlign={textAlign} {...props} />;
};

export default Input;

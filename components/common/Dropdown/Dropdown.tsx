import React, { forwardRef, useState } from 'react';
import * as S from './Dropdown.styles';
import { IDropdownProps } from './Dropdown.types';

const Dropdown = (
  { options, handleOptionSelect }: IDropdownProps,
  ref: IDropdownProps['ref'],
) => {
  return (
    <S.Container ref={ref}>
      <S.Wrapper>
        <S.Options>
          {options.map(option => (
            <S.Option key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </S.Option>
          ))}
        </S.Options>
      </S.Wrapper>
    </S.Container>
  );
};

export default forwardRef(Dropdown);

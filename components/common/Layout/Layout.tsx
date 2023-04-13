import React, { PropsWithChildren } from 'react';
import * as S from './Layout.styles';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <S.Container>
      <S.BackgroundImage
        src="images/mobile-background.png"
        alt="Mobile background"
      />
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default Layout;

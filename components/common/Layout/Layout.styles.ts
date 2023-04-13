import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 500px;
  height: 100vh;
  padding: 100px 60px;
  margin: 0 auto;
  /* background-color: black; */
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

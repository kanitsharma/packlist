import React from 'react';
import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.black};
  font-size: 130px;
  line-height: 0.2;
`;

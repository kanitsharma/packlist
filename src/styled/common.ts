import React from 'react'
import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #000001;
`

export const Title = styled.h1`
  color: #21F9FB;
  font-size: 100px;
  text-shadow: 0 0 5px #34B2E4, 0 0 20px #184aaa, 0 0 40px #051f7c;
`

export const InfoList = styled.div`
  color: #21F9FB;

  div {
    padding: 5px 0px;
  }
`
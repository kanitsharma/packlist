import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  outline: none;
  border: 3px solid #34B2E4;
  background: none;
  font-size: 18px;
  padding: 13px 10px;
  color: #34B2E4;
  /* border-radius: 4px; */
  /* text-indent: 40px; */
  width: 400px;
`

const SearchIcon = styled(MdSearch)`
  position: absolute;
  top: ${(p: { animate: Boolean }) => p.animate ? '-17px' : '10px'};
  color: ${(p: { animate: Boolean }) => p.animate ? '#34B2E4' : '#aaa'};
  transform: scale(${(p: { animate: Boolean }) => p.animate ? '0.7' : '0.9'}) translateX(${(p: { animate: Boolean }) => p.animate ? '-8px' : '0'});
  left: 8px;
  transition: all 0.1s linear;
  background-color: #000000;
  padding: 0px 2px;
  border-radius: 20px;
`

type InputTypes = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  animate: () => void
  animateInput: Boolean
  value: string
}

const SearchInput = (props: InputTypes) => (
  <Wrapper>
    <Input onChange={props.onChange} onKeyPress={props.onKeyPress} onFocus={props.animate} onBlur={props.animate} value={props.value} />
    <SearchIcon size='40px' animate={props.value.length !== 0 || props.animateInput} />
  </Wrapper>
)

export default SearchInput
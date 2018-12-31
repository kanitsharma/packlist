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
  font-size: 20px;
  padding: 10px 10px;
  color: #34B2E4;
  border-radius: 4px;
  text-indent: 40px;
  width: 400px;
`

const SearchIcon = styled(MdSearch)`
  position: absolute;
  top: 8px;
  left: 8px;
`

type InputTypes = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchInput = (props: InputTypes) => (
  <Wrapper>
    <Input placeholder='Enter the url of your repo' onChange={props.onChange} onKeyPress={props.onKeyPress} />
    <SearchIcon color='#34B2E4' size='40px' />
  </Wrapper>
)

export default SearchInput
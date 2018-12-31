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

const SearchInput: React.FunctionComponent = props => (
  <Wrapper>
    <Input placeholder='Enter the url of your repo' />
    <SearchIcon color='#34B2E4' size='40px' />
  </Wrapper>
)

export default SearchInput
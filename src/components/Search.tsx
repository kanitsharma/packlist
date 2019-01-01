import styled from 'styled-components';

const Search = styled.button`
  border: none;
  margin-top: 30px;
  font-size: 18px;
  background-color: ${props => props.theme.colors.blue};
  height: 40px;
  width: 120px;
  border-radius: 9999px;
  color: ${props => props.theme.colors.white};
`;

export default Search;

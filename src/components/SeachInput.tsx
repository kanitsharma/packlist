import React from 'react';
import styled from 'styled-components';

type InputTypes = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  animate: () => void;
  animateInput: Boolean;
  value: string;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  border: 3px solid ${props => props.theme.colors.grey};
  border-radius: 6px;
  background: transparent;
  max-height: 50px;
`;

const Input = styled.input`
  outline: none;
  background: none;
  font-size: 18px;
  border: none;
  color: ${props => props.theme.colors.black};
  width: 400px;
  transition: all 0.1s ease;
  &:focus + label {
    color: ${props => props.theme.colors.blue};
    transform: translateY(-20px);
    font-size: 12px;
    background: white;
    padding: 0 2px 0 2px;
  }
`;

type LabelProps = {
  notched: boolean;
};

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  transition: all 0.2s linear;
  color: ${(props: LabelProps) => (!props.notched ? '#909090' : '#e72e77')};
  font-size: ${(props: LabelProps) => (!props.notched ? '14px' : '12px')};
  transform: ${(props: LabelProps) =>
    !props.notched ? 'unset' : 'translateY(-20px)'};
  background: ${(props: LabelProps) => (!props.notched ? 'unset' : 'white')};
  padding: ${(props: LabelProps) => (!props.notched ? 'unset' : '0 2px 0 2px')};
`;

const SearchInput = (props: InputTypes) => (
  <Wrapper>
    <Input
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      onFocus={props.animate}
      onBlur={props.animate}
      value={props.value}
    />
    <Label notched={!!props.value}>Enter Github Repo</Label>
  </Wrapper>
);

export default SearchInput;

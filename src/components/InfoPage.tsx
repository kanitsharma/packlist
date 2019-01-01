import React from 'react';
import styled from 'styled-components';
import { Page } from '../styled/common';

const InfoPage = styled(Page)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.black};
  padding: 50px;
  font-size: 80px;
  font-weight: bold;
`;

const InfoList = styled.div``;

const InfoItem = styled.div`
  padding: 5px;
  color: #21f9fb;
  text-decoration: ${(props: { checked: Boolean }) => props.checked && 'line-through'};
`;

type InfoTypes = {
  fileList: String[];
  repoDetails: {
    owner: String;
    name: String;
  };
};

type InfoState = {
  prettier: Boolean;
  eslint: Boolean;
};

export default class extends React.Component<InfoTypes, Object> {
  render() {
    const {
      fileList,
      repoDetails: { owner, name },
    } = this.props;
    return (
      <InfoPage>
        <InfoHeader>
          {owner}/<br />
          {name}
        </InfoHeader>
        <InfoList>{/* {
            Checklist.map(x => (
              <InfoItem checked={fileList.includes(x)} >{x}</InfoItem>
            ))
          } */}</InfoList>
      </InfoPage>
    );
  }
}

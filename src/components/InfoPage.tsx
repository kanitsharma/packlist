import React from 'react';
import styled from 'styled-components';
import { Page } from '../styled/common';
import { RouteComponentProps } from '@reach/router';
import GifLoader from '../components/GifLoader';

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

type InfoType = {
  username?: string;
  repo?: string;
};

type InfoState = {
  prettier: Boolean;
  eslint: Boolean;
};

class Info extends React.Component<InfoType> {
  render() {
    return (
      <InfoPage>
        <InfoHeader>
          {this.props.username}/<br />
          {this.props.repo}
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

export default (props: RouteComponentProps & InfoType) => (
  <React.Suspense
    fallback={
      <Page>
        <GifLoader />
      </Page>
    }
  >
    <Info {...props} />
  </React.Suspense>
);

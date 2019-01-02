import React from 'react';
import styled from 'styled-components';
import { Page } from '../styled/common';
import { RouteComponentProps } from '@reach/router';

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

const InfoDetails = styled(InfoHeader)`
  font-size: 20px;
`

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
  fileNames: string[],
  error: Boolean,
  errorMessage: string,
  repoDetails: {
    description: number
  }
};

const API_URL: string = 'https://api.github.com/repos/';

class Info extends React.Component<InfoType & RouteComponentProps, InfoState> {
  state: InfoState = {
    fileNames: [],
    error: false,
    errorMessage: '',
    repoDetails: {
      description: 0
    }
  }

  componentDidMount() {
    const { username, repo } = this.props
    this.fetchData(`${username}/${repo}`)
  }

  fetchData = (url: String) => {
    Promise.all([
      fetch(API_URL + url + '/contents'),
      fetch(API_URL + url)
    ])
      .then(([x, y]) => Promise.all([x.json(), y.json()]))
      .then(([x, y]) => {
        if (x.message || y.message) {
          this.setState({ error: true, errorMessage: x.message })
        } else {
          console.log(y)
          this.setState({ fileNames: x.map((x: { name: String }) => x.name), repoDetails: y })
        }
      })
  }

  render() {
    return (
      <InfoPage>
        <InfoHeader>
          {this.props.username}/<br />
          {this.props.repo}
        </InfoHeader>
        <InfoDetails>{this.state.repoDetails.description} stars</InfoDetails>
        <InfoList>{/* {
            Checklist.map(x => (
              <InfoItem checked={fileList.includes(x)} >{x}</InfoItem>
            ))
          } */}</InfoList>
      </InfoPage>
    );
  }
}

export default Info
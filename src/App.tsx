import React, { Component, Suspense } from 'react';
import { Page, Title } from './styled/common';
import SearchInput from './components/SeachInput';
import Search from './components/Search';
import GifLoader, { PreloadLoader } from './components/GifLoader';
import Never from './utils/never';
import { RouteComponentProps } from '@reach/router';

const InfoPage = React.lazy(() => import('./components/InfoPage'));

type Render = 'input' | 'loader';

type RepoDetails = {
  name: String;
  owner: String;
};

type AppState = {
  url: string;
  toRender: Render;
  fileNames: String[];
  error: Boolean;
  errorMessage: String;
  repoDetails: RepoDetails;
  animateInput: Boolean;
};

const API_URL: string = 'https://api.github.com/repos/';

class App extends Component<RouteComponentProps, AppState> {
  state: AppState = {
    url: '',
    toRender: 'input',
    fileNames: [],
    error: false,
    errorMessage: '',
    repoDetails: {
      name: '',
      owner: '',
    },
    animateInput: false,
  };

  componentDidMount = () => PreloadLoader();

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ url: e.currentTarget.value });
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.url.length !== 0) {
      this.setState({ toRender: 'loader' });
      const [username, repo] = this.getData(this.state.url);
      this.props.navigate && this.props.navigate(`/repo/${this.state.url}`);
    }
  };

  handleAnimate = () => {
    this.setState(prevState => ({ animateInput: !prevState.animateInput }));
  };

  getData = (url: String): [String, String] => {
    const arr = url.split('/').filter(x => x.length !== 0);
    const [username, repo] = arr.slice(Math.max(arr.length - 2, 1));
    return [username, repo];
  };

  fetchData = (url: String) => {
    Promise.all([fetch(API_URL + url + '/contents'), fetch(API_URL + url)])
      .then(([x, y]) => Promise.all([x.json(), y.json()]))
      .then(([x, y]) => {
        if (x.message || y.message) {
          this.setState({ error: true, errorMessage: x.message });
        } else {
          this.setState({
            fileNames: x.map((x: { name: String }) => x.name),
            repoDetails: { owner: y.owner.login, name: y.name },
          });
        }
      });
  };

  componentSwitcher = (S: Render): React.ReactNode => {
    switch (S) {
      case 'input':
        return (
          <Page>
            <Title>Packlist</Title>,
            <SearchInput onChange={this.handleInput} onKeyPress={this.handleKeyPress} animateInput={this.state.animateInput} animate={this.handleAnimate} value={this.state.url} />
            <Search onClick={_ => this.fetchData(this.state.url)}>Go!</Search>
          </Page>
        );
      case 'loader':
        return (
          <Page>
            <GifLoader />
          </Page>
        );

      default:
        return Never(S);
    }
  };

  render() {
    return this.componentSwitcher(this.state.toRender);
  }
}

export default App;

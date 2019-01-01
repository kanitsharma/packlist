import React, { Component, Suspense } from 'react';
import { Page, Title } from './styled/common';
import SearchInput from './components/SeachInput';
import Search from './components/Search';
import { RouteComponentProps } from '@reach/router';


type AppState = {
  url: string;
  animateInput: Boolean;
};

class App extends Component<RouteComponentProps, AppState> {
  state: AppState = {
    url: '',
    animateInput: false,
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ url: e.currentTarget.value });
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.url.length !== 0) {
      this.navigate()
    }
  };

  navigate = () => this.props.navigate && this.props.navigate(`/repo/${this.state.url}`);

  handleAnimate = () => {
    this.setState(prevState => ({ animateInput: !prevState.animateInput }));
  }

  render() {
    return (
      <Page>
        <Title>Packlist</Title>,
        <SearchInput onChange={this.handleInput} onKeyPress={this.handleKeyPress} animateInput={this.state.animateInput} animate={this.handleAnimate} value={this.state.url} />
        <Search onClick={_ => this.navigate()}>Go!</Search>
      </Page>
    )
  }
}

export default App;

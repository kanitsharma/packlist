import React, { Component } from 'react';
import { Page, Title } from './styled/common'
import SearchInput from './components/SeachInput'

class App extends Component {
  render() {
    return (
      <Page>
        <Title>Git Checker</Title>
        <SearchInput />
      </Page>
    );
  }
}

export default App;

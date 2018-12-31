import React, { Component, FormEvent } from 'react';
import { Page, Title } from './styled/common'
import SearchInput from './components/SeachInput'
import GifLoader from './components/GifLoader'
import Never from './utils/never'

type Render = 'input' | 'loader' | 'info'

type AppState = {
  url: String,
  toRender: Render,
  error: Boolean
}

const API_URL: string = 'https://api.github.com/users/'

class App extends Component<Object, AppState> {
  state: AppState = {
    url: '',
    toRender: 'input',
    error: false
  }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ url: e.currentTarget.value })
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.url.length !== 0) {
      this.setState({ toRender: 'loader' })
      this.fetchData()
    }
  }

  fetchData() {
    fetch(API_URL + this.state.url + '/repos')
      .then(res => res.json())
      .then(res => console.log(res))
  }

  componentSwitcher = (S: Render): React.ReactNode => {
    switch (S) {
      case "input": return ([
        <Title>Git Checker</Title>,
        <SearchInput onChange={this.handleInput} onKeyPress={this.handleKeyPress} />
      ])

      case "loader": return (
        <GifLoader />
      )

      case "info": return (
        <div />
      )

      default: return Never(S)
    }
  }

  render() {
    return (
      <Page>
        {this.componentSwitcher(this.state.toRender)}
      </Page>
    );
  }
}

export default App;

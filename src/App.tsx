import React, { Component, FormEvent } from 'react';
import { Page, Title, InfoList } from './styled/common'
import SearchInput from './components/SeachInput'
import GifLoader from './components/GifLoader'
import Never from './utils/never'

type Render = 'input' | 'loader' | 'info'

type AppState = {
  url: String,
  toRender: Render,
  fileNames: String[],
  error: Boolean,
  errorMessage: String
}

const API_URL: string = 'https://api.github.com/repos/'

class App extends Component<Object, AppState> {
  state: AppState = {
    url: '',
    toRender: 'input',
    fileNames: [],
    error: false,
    errorMessage: ''
  }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ url: e.currentTarget.value })
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.url.length !== 0) {
      this.setState({ toRender: 'loader' })
      this.fetchData(this.state.url)
    }
  }

  getData = (url: String): [String, String] => {
    const arr = url.split('/').filter(x => x.length !== 0)
    const [username, repo] = arr.slice(Math.max(arr.length - 2, 1))
    return [username, repo]
  }

  fetchData = (url: String) => {
    const [username, repo] = this.getData(url)
    fetch(API_URL + username + '/' + repo + '/contents')
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          this.setState({ error: true, errorMessage: res.message })
        } else {
          this.setState({ fileNames: res.map((x: { name: String }) => x.name), toRender: 'info' })
        }
      })
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
        <InfoList>{this.state.fileNames.map(x => <div>{x}</div>)}</InfoList>
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

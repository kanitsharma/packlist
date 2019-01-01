import React, { Component, Suspense } from 'react';
import { Page, Title } from './styled/common'
import SearchInput from './components/SeachInput'
import GifLoader from './components/GifLoader'
import Never from './utils/never'

const InfoPage = React.lazy(() => import('./components/InfoPage'))

type Render = 'input' | 'loader' | 'info'

type RepoDetails = {
  name: String,
  owner: String
}

type AppState = {
  url: String,
  toRender: Render,
  fileNames: String[],
  error: Boolean,
  errorMessage: String,
  repoDetails: RepoDetails
}

const API_URL: string = 'https://api.github.com/repos/'

class App extends Component<Object, AppState> {
  state: AppState = {
    url: '',
    toRender: 'input',
    fileNames: [],
    error: false,
    errorMessage: '',
    repoDetails: {
      name: '',
      owner: ''
    }
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
    Promise.all([
      fetch(API_URL + username + '/' + repo + '/contents'),
      fetch(API_URL + username + '/' + repo)
    ])
      .then(([x, y]) => Promise.all([x.json(), y.json()]))
      .then(([x, y]) => {
        if (x.message || y.message) {
          this.setState({ error: true, errorMessage: x.message })
        } else {
          this.setState({ toRender: 'info', fileNames: x.map((x: { name: String }) => x.name), repoDetails: { owner: y.owner.login, name: y.name } })
        }
      })

  }

  componentSwitcher = (S: Render): React.ReactNode => {
    switch (S) {
      case "input": return (
        <Page>
          <Title>Packlist</Title>,
          <SearchInput onChange={this.handleInput} onKeyPress={this.handleKeyPress} />
        </Page>
      )
      case "loader": return (
        <Page>
          <GifLoader />
        </Page>
      )

      case "info": return (
        <Suspense fallback={
          <Page>
            <GifLoader />
          </Page>
        }>
          <InfoPage repoDetails={this.state.repoDetails} fileList={this.state.fileNames} />
        </Suspense>
      )

      default: return Never(S)
    }
  }

  render() {
    return this.componentSwitcher(this.state.toRender)
  }
}

export default App;

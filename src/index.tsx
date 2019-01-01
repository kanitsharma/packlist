import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import theme from './theme';
import App from './App';

const InfoPage = React.lazy(() => import('./components/InfoPage'));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App path="/" />
      <InfoPage path="/repo/:username/:repo" />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import theme from './styled/theme';
import App from './App';

const InfoPage = React.lazy(() => import('./components/InfoPage'));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Suspense fallback={<div>Loading...</div>} >
      <Router>
        <App path="/" />
        <InfoPage path="/repo/:username/:repo" />
      </Router>
    </Suspense>
  </ThemeProvider>,
  document.getElementById('root'),
);
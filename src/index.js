/*eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './style/style.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.css';

injectTapEventPlugin();

const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

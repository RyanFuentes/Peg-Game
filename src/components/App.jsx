import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../redux/store/configureStore';
import routes from '../routes';
import DevTools from './DevTools';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router routes={routes} history={history}/>
          {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
        </div>
      </Provider>
    );
  }
}

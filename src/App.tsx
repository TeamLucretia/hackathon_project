import * as React from 'react';
import './assets/styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ApplicationStore } from './data_layer/stores/ApplicationStore';
import { HomePage } from './views/HomePage';

const store = new ApplicationStore();

type Props = {
  store?: ApplicationStore;
};

class App extends React.Component<Props> {
  render() {
    return (
      <div style={fullContainer}>
        <Provider store={store}>
          <Router>
            <Route exact={true} path="/home" component={HomePage} />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;

const fullContainer = {
  height: '100%',
  width: '100%'
};

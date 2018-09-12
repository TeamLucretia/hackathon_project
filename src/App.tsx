import * as React from 'react';
import './assets/styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './views/HomePage';

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <div style={fullContainer}>
        <Router>
          <Route exact={true} path="/" component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default App;

const fullContainer = {
  width: '100%'
};

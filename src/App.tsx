import * as React from 'react';
import './assets/styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './views/HomePage';

type Props = {};

const App = (props: Props): JSX.Element => {
  return (
    <div style={styles.fullContainer}>
      <Router>
        <Route exact={true} path="/" component={HomePage} />
      </Router>
    </div>
  );
};

export default App;

const styles = {
  fullContainer: {
    position: 'relative',
    width: '100%'
  } as React.CSSProperties
};

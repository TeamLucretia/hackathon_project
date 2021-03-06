import * as React from 'react';
import './assets/styles/App.css';
import { HomePage } from './views/HomePage';

type Props = {};

const App = (props: Props): JSX.Element => {
  return (
    <div style={styles.fullContainer}>
      <HomePage />
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

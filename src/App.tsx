import * as React from 'react';
import './assets/styles/App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
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
            <Provider store={store}>
                <Router>
                    <div className="AppContainer">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/uno">Route 1</Link>
                            </li>
                            <li>
                                <Link to="/dos">Route 2</Link>
                            </li>
                            <li>
                                <Link to="/tres">Route 3 w/ subroutes!</Link>
                            </li>
                        </ul>

                        <hr />

                        <Route exact={true} path="/" component={HomePage} />
                        <Route path="/uno" component={RouteONE} />
                        <Route path="/dos" component={RouteTWO} />
                        <Route path="/tres" component={RouteTHREE} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

// Note: This is the central App component so in the end, there should be nothing in this file except imports,
// We're building these components here for demonstration purposes and to reduce examplefile clutter
// We should delete these asap in dev

const RouteONE = () => (
    <div>
        <h2>Main Route: 1</h2>
    </div>
);

const RouteTWO = () => (
    <div>
        <h2>Main Route: 2</h2>
    </div>
);

const RouteTHREE = ({ match }: RouteComponentProps<void>) => (
    <div>
        <h2>Main Route: 3</h2>

        <Link to={`${match.url}/subuno`}>SubRoute 1</Link>
        <br />
        <Link to={`${match.url}/subdos`}>SubRoute 2</Link>
        <br />
        <Link to={`${match.url}/subtres`}>SubRoute 3</Link>

        <Route path={`${match.url}/:route_id`} component={SubRoute} />
        <Route exact={true} path={match.url} render={() => <h3>Select A Route!</h3>} />
    </div>
);

const SubRoute = ({ match }: RouteComponentProps<{ route_id: string }>) => (
    <div>
        <h3>{match.params.route_id}</h3>
    </div>
);

export default App;

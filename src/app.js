import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;
import App from './components/App';

// Creating a store!
const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
    // let state = store.getState();
    ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>, document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);
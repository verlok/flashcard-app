import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import * as localStore from './localStore';

// Creating a store!
const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

function run() {
    localStore.set(store.getState(), ['decks', 'cards']);
    ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/deck/:deckId" component={VisibleCards}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);
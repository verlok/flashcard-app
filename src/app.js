import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
// Routing stuff
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
// Local store script to emulate DB
import * as localStore from './localStore';
// Reducers + routing reducer
import * as reducers from './reducers';
reducers.routing = routerReducer;
// Components
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';

// Create the store and sync history with store
const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

function run() {
    localStore.set(store.getState(), ['decks', 'cards']);
    ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/deck/:deckId" component={VisibleCards}>
                    <Route path="/deck/:deckId/new" component={NewCardModal} />
                    <Route path="/deck/:deckId/edit/:cardId" component={EditCardModal} />
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);

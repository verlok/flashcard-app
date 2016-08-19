import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
// Routing stuff
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
// Thunks, to do async calls to a remote API
import thunkMiddleware from "redux-thunk";
// Reducers + routing reducer
import * as reducers from './reducers';
reducers.routing = routerReducer;
// Actions
import {fetchData} from "./actions";
// Components
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

// Create the store and sync history with store
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
    ReactDOM.render(<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/deck/:deckId" component={VisibleCards}>
                    <Route path="/deck/:deckId/new" component={NewCardModal} />
                    <Route path="/deck/:deckId/edit/:cardId" component={EditCardModal} />
                    <Route path="/deck/:deckId/study" component={StudyModal} />
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
}

function save() {
    var state = store.getState();
    // TODO: Save only if decks or cards changed!
    fetch('/api/data', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            decks: state.decks,
            cards: state.cards
        })
    });
}

// First run + subscribe to store change
function init() {
    run();
    store.subscribe(run);
    store.subscribe(save);
    store.dispatch(fetchData());
}

init();

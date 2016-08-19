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

// Keep track of previously saved data, to minimize save requests
var previousSave;

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

function save(dataToSave) {
    fetch('/api/data', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: dataToSave
    })
        .then(() => { previousSave = dataToSave });
}

function checkThenSave() {
    var state = store.getState();
    var dataToSave = JSON.stringify({
        decks: state.decks,
        cards: state.cards
    });
    // Prevent from saving every single time the store changes
    if (previousSave !== dataToSave) save(dataToSave);
}

// First run + subscribe to store change
function init() {
    run();
    store.subscribe(run);
    store.subscribe(checkThenSave);
    store.dispatch(fetchData());
}

init();

import { addDeck, showAddDeck, hideAddDeck } from './actions';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';

// Creating a store!
const store = createStore(combineReducers(reducers));

function run() {
    // Rendering a pure component
    let state = store.getState();
    ReactDOM.render(<App>
        <Sidebar
            decks={state.decks}
            addingDeck={state.addingDeck}
            addDeck={name => store.dispatch(addDeck(name))}
            showAddDeck={() => store.dispatch(showAddDeck())}
            hideAddDeck={() => store.dispatch(hideAddDeck())}
            />
    </App>, document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);
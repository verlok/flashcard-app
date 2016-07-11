
// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK

// Action creators - functions that just return an action object
const addDeck = name => ({ type: "ADD_DECK", data: name });
const showAddDeck = () => ({ type: "SHOW_ADD_DECK" });
const hideAddDeck = () => ({ type: "HIDE_ADD_DECK" });

// Sub-reducer for cards
const cards = (state, action) => {
    // this is a reducer - it takes an action and change the state
    switch (action.type) {
        case "ADD_CARD":
            let newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date
            });
            return state.concat([newCard]);
        default:
            return state || [];
    }
};

// Sub-reducer for decks
const decks = (state, action) => {
    switch (action.type) {
        case "ADD_DECK":
            let newDeck = {name: action.data, id: +new Date}
            return state.concat([newDeck]);
        default:
            return state || [];
    }
};

// Sub-reducer for showing or hiding decks
const addingDeck = (state, action) => {
    switch (action.type) {
        case "SHOW_ADD_DECK": return true;
        case "HIDE_ADD_DECK": return false;
        default: return !!state; // must convert it to boolean because the 1st time React calls it, the state will be undefined
    }
};

// Creating a store!
const store = Redux.createStore(Redux.combineReducers({
    cards,
    decks,
    addingDeck
    // equivalent of { cards: cards, decks: decks }
}));

// Pure component - props.children takes whatever is inside the <App> tag
const App = (props) => {
    return (<div className="app">
        {props.children}
    </div>);
};

const Sidebar = React.createClass({
    render() {
        let props = this.props; //just a shortcut
        return (<div className="sidebar">
            <h2>All Decks</h2>
            <ul>
            {props.decks.map((deck, i) =>
                <li key={i}>{deck.name}</li>
            )}
            </ul>
            { props.addingDeck && <input ref="add" /> }
        </div>)
    }
});

function run() {
    // Rendering a pure component
    let state = store.getState();
    console.log(state);
    ReactDOM.render(<App>
        <Sidebar decks={state.decks} addingDeck={state.addingDeck} />
    </App>, document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);

// Global functions just to test the reducers
window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));
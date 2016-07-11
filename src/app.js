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

// Creating a store!
const store = Redux.createStore(Redux.combineReducers({
    cards // equivalent of cards: cards
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

// Rendering a pure component
ReactDOM.render(<App>
    <Sidebar decks={[ {name: "Deck 1"} ]} addingDeck={false} />
</App>, document.getElementById('root'));

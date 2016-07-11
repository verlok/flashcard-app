/*
{
    // It's better to have top-level properties, as flat as you can have,
    // instead of having a lot of nested objects
    // Then you create a reducer for each state property
    // and combine reducers using combineReducers

    cards: [{
        id: 123,
        front: '',
        back: '',
        deckId: 123
    }],
    decks: [{
        id: 123,
        ...
    }],

    // these properties also exists in the router, but we copy them in the state
    selectedDeckId: 123,
    studyMode: true/false
}
*/

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
    /*
    // combineReducers is the equivalent of manually doing:
    function (state, action) {
        return {
            cards: cards(state.cards, action),
            docks: docks(state.docks, action)
        }
    }
    */
}));

// Watch the store for changes
store.subscribe(() => {
    console.log (store.getState());
});

// Dispatch an action to the store (which will call the reducer)
store.dispatch({
    type: "ADD_CARD",
    data: {
        front: "front",
        back: "back"
    }
});

store.dispatch({
    type: "ADD_CARD",
    data: {
        front: "front",
        back: "back"
    }
});
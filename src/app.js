// Creating a store!
const store = Redux.createStore(function (state, action ){
    // this is a reducer - it takes an action and change the state
    switch (action.type) {
        case "ADD_CARD":
            let newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date
            });
            return Object.assign({}, state, {
                cards: state.cards ? state.cards.concat([newCard]) : [newCard]
            });
        default:
            return state || {};
    }
});

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
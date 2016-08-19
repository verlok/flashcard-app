// These are reducers - they take an action and change the state

// Sub-reducer for card filter
export const cardFilter = (state, action) => {
    switch (action.type) {
        case "FILTER_CARDS":
            return action.data;
        default:
            return state || "";
    }
};

// Sub-reducer for cards
export const cards = (state, action) => {
    switch (action.type) {
        case "ADD_CARD":
            let newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date
            });
            return state.concat([newCard]);
        case "UPDATE_CARD":
            let cardUpdate = action.data;
            return state.map(card => (card.id !== cardUpdate.id) ?
                card:
                Object.assign({}, card, cardUpdate)
            );
        case "DELETE_CARD":
            return state.filter(card => card.id !== action.data);
        default:
            return state || [];
    }
};

// Sub-reducer for decks
export const decks = (state, action) => {
    switch (action.type) {
        case "ADD_DECK":
            let newDeck = {name: action.data, id: +new Date}
            return state.concat([newDeck]);
        default:
            return state || [];
    }
};

// Sub-reducer for showing or hiding decks
export const isAddingDeck = (state, action) => {
    switch (action.type) {
        case "SHOW_ADD_DECK": return true;
        case "HIDE_ADD_DECK": return false;
        default: return !!state; // must convert it to boolean because the 1st time React calls it, the state will be undefined
    }
};

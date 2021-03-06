// Action creators - functions that just return an action object
export const showAddDeck = ()       => ({type: "SHOW_ADD_DECK"});
export const hideAddDeck = ()       => ({type: "HIDE_ADD_DECK"});
export const addDeck     = name     => ({type: "ADD_DECK",     data: name});
export const addCard     = card     => ({type: "ADD_CARD",     data: card});
export const updateCard  = card     => ({type: "UPDATE_CARD",  data: card});
export const deleteCard  = cardId   => ({type: "DELETE_CARD",  data: cardId});
export const filterCards = query    => ({type: "FILTER_CARDS", data: query});
export const setShowBack = showBack => ({type: "SHOW_BACK",    data: showBack});
export const receiveData = data     => ({type: "RECEIVE_DATA", data: data});

export const fetchData = () => {
    return dispatch => {
        //dispatch(startedCall()); TODO
        fetch("/api/data")
            .then(res => res.json())
            .then(json => dispatch(receiveData(json)));
            //.catch(err => dispatch(failedRequest(err))); TODO
    };
};

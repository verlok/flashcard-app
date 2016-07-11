(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

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

var cards = function cards(state, action) {
    // this is a reducer - it takes an action and change the state
    switch (action.type) {
        case "ADD_CARD":
            var newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date()
            });
            return state.concat([newCard]);
        default:
            return state || [];
    }
};

// Creating a store!
var store = Redux.createStore(Redux.combineReducers({
    cards: cards // equivalent of cards: cards
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
store.subscribe(function () {
    console.log(store.getState());
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

},{}]},{},[1]);

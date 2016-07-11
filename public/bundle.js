(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Creating a store!
var store = Redux.createStore(function (state, action) {
    // this is a reducer - it takes an action and change the state
    switch (action.type) {
        case "ADD_CARD":
            var newCard = Object.assign({}, action.data, {
                score: 1,
                id: +new Date()
            });
            return Object.assign({}, state, {
                cards: state.cards ? state.cards.concat([newCard]) : [newCard]
            });
        default:
            return state || {};
    }
});

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

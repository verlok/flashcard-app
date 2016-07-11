(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Sub-reducer for cards
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
}));

// Pure component - props.children takes whatever is inside the <App> tag
var App = function App(props) {
    return React.createElement(
        "div",
        { className: "app" },
        props.children
    );
};

// Rendering a pure component
ReactDOM.render(React.createElement(
    App,
    null,
    "Hello ",
    React.createElement(
        "strong",
        null,
        "React"
    )
), document.getElementById('root'));

},{}]},{},[1]);

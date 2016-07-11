(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ADD_DECK
// SHOW_ADD_DECK
// HIDE_ADD_DECK

// Action creators - functions that just return an action object
var _addDeck = function _addDeck(name) {
    return { type: "ADD_DECK", data: name };
};
var _showAddDeck = function _showAddDeck() {
    return { type: "SHOW_ADD_DECK" };
};
var _hideAddDeck = function _hideAddDeck() {
    return { type: "HIDE_ADD_DECK" };
};

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

// Sub-reducer for decks
var decks = function decks(state, action) {
    switch (action.type) {
        case "ADD_DECK":
            var newDeck = { name: action.data, id: +new Date() };
            return state.concat([newDeck]);
        default:
            return state || [];
    }
};

// Sub-reducer for showing or hiding decks
var addingDeck = function addingDeck(state, action) {
    switch (action.type) {
        case "SHOW_ADD_DECK":
            return true;
        case "HIDE_ADD_DECK":
            return false;
        default:
            return !!state; // must convert it to boolean because the 1st time React calls it, the state will be undefined
    }
};

// Creating a store!
var store = Redux.createStore(Redux.combineReducers({
    cards: cards,
    decks: decks,
    addingDeck: addingDeck
    // equivalent of { cards: cards, decks: decks }
}));

// Pure component - props.children takes whatever is inside the <App> tag
var App = function App(props) {
    return React.createElement(
        "div",
        { className: "app" },
        props.children
    );
};

var Sidebar = React.createClass({
    displayName: "Sidebar",
    componentDidUpdate: function componentDidUpdate() {
        var el = ReactDOM.findDOMNode(this.refs.addDeckInput);
        if (el) el.focus();
    },
    render: function render() {
        var _this = this;

        var props = this.props; //just a shortcut
        return React.createElement(
            "div",
            { className: "sidebar" },
            React.createElement(
                "h2",
                null,
                "All Decks"
            ),
            React.createElement(
                "button",
                { onClick: function onClick(e) {
                        return _this.props.showAddDeck();
                    } },
                "Add Deck"
            ),
            React.createElement(
                "ul",
                null,
                props.decks.map(function (deck, i) {
                    return React.createElement(
                        "li",
                        { key: i },
                        deck.name
                    );
                })
            ),
            props.addingDeck && React.createElement("input", { ref: "addDeckInput", onKeyPress: this.createDeck })
        );
    },
    createDeck: function createDeck(evt) {
        if (evt.which !== 13) return;
        var name = ReactDOM.findDOMNode(this.refs.addDeckInput).value;
        this.props.addDeck(name);
        this.props.hideAddDeck();
    }
});

function run() {
    var _React$createElement;

    // Rendering a pure component
    var state = store.getState();
    console.log(state);
    ReactDOM.render(React.createElement(
        App,
        null,
        React.createElement(Sidebar, (_React$createElement = {
            decks: state.decks, addingDeck: state.addingDeck
        }, _defineProperty(_React$createElement, "addingDeck", state.addingDeck), _defineProperty(_React$createElement, "addDeck", function addDeck(name) {
            return store.dispatch(_addDeck(name));
        }), _defineProperty(_React$createElement, "showAddDeck", function showAddDeck() {
            return store.dispatch(_showAddDeck());
        }), _defineProperty(_React$createElement, "hideAddDeck", function hideAddDeck() {
            return store.dispatch(_hideAddDeck());
        }), _React$createElement))
    ), document.getElementById('root'));
}

// First run + subscribe to store change
run();
store.subscribe(run);

},{}]},{},[1]);

import React from 'react';
import ReactDOM from 'react-dom';

const Sidebar = React.createClass({
    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this.refs.addDeckInput);
        if (el) el.focus();
    },
    render() {
        let props = this.props; //just a shortcut
        return (<div className="sidebar">
            <h2>All Decks</h2>
            <button onClick={ e => this.props.showAddDeck() }>Add Deck</button>
            <ul>
            {props.decks.map((deck, i) =>
                <li key={i}>{deck.name}</li>
            )}
            </ul>
            { props.addingDeck && <input ref="addDeckInput" onKeyPress={this.createDeck} /> }
        </div>)
    },
    createDeck(evt) {
        if (evt.which !== 13) return;
        var name = ReactDOM.findDOMNode(this.refs.addDeckInput).value;
        this.props.addDeck(name);
        this.props.hideAddDeck();
    }
});

export default Sidebar;

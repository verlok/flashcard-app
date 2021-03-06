import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {addDeck, showAddDeck, hideAddDeck} from '../actions';

const mapStateToProps = ({decks, isAddingDeck}) => ({
    decks,
    isAddingDeck
});

const mapDispatchToProps = dispatch => ({
    addDeck:   name => dispatch(addDeck(name)),
    showAddDeck: () => dispatch(showAddDeck()),
    hideAddDeck: () => dispatch(hideAddDeck())
});

const Sidebar = React.createClass({
    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this.refs.addDeckInput);
        if (el) el.focus();
    },
    render() {
        let props = this.props; //just a shortcut
        return (<div className="sidebar">
            <h2>All Decks</h2>
            <ul>
                {props.decks.map((deck, i) =>
                    <li key={i}>
                        <Link to={`/deck/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                )}
            </ul>
            { props.isAddingDeck && <input ref="addDeckInput" onKeyPress={this.createDeck}/> }
        </div>)
    },
    createDeck(evt) {
        if (evt.which !== 13) return;
        var name = ReactDOM.findDOMNode(this.refs.addDeckInput).value;
        this.props.addDeck(name);
        this.props.hideAddDeck();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

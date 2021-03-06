import React from "react";
import ReactDOM from "react-dom";
import {Link, browserHistory} from "react-router";

const CardModal = React.createClass({
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.front).focus();
    },
    render() {
        let {card, onDelete} = this.props;

        return (<div className="modal">
            <h1>{onDelete ? "Edit" : "New"} Card</h1>
            <label htmlFor="cardModalFront">Card Front:</label>
            <textarea id="cardModalFront" ref="front" defaultValue={card.front}></textarea>
            <label htmlFor="cardModalBack">Card Back:</label>
            <textarea id="cardModalBack" ref="back" defaultValue={card.back}></textarea>
            <p>
                <button onClick={this.onSave}>Save Card</button>
                <Link className="btn" to={`/deck/${card.deckId}`}>Cancel</Link>
                { onDelete ?
                    <button onClick={this.onDelete} className="delete">Delete Card</button> :
                    null }
            </p>
        </div>);
    },
    onSave(e) {
        var front = ReactDOM.findDOMNode(this.refs.front).value;
        var back = ReactDOM.findDOMNode(this.refs.back).value;
        this.props.onSave(Object.assign({}, this.props.card, {
            front,
            back
        }));
        browserHistory.push(`/deck/${this.props.card.deckId}`);
    },
    onDelete(e) {
        this.props.onDelete(this.props.card.id);
        browserHistory.push(`/deck/${this.props.card.deckId}`);
    }
});

export default CardModal;

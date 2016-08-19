import React from "react";
import { Link } from "react-router";

// Destructuring from props, so props.card
const Card = ({ card }) => {
    return (<div className="card">
        <div>
            <p>{card.front}</p>
            <Link className="btn" to={`/deck/${card.deckId}/edit/${card.id}`}>Edit</Link>
        </div>
    </div>)
};

export default Card;

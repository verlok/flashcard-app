import React from "react";
import Card from "./Card";
import { connect } from "react-redux";
import fuzzysearch from "fuzzysearch";

const matches = (filter, { front, back }) => {
    return fuzzysearch(filter, front) || fuzzysearch(filter, back);
};

// First argument is state.cards, second is router.params.deckId
const mapStateToProps = ({cards, cardFilter}, {params: {deckId}}) => {
    let lowerFilter = cardFilter.toLowerCase();
    return {
        cards: cards.filter(card => {
            let front = card.front.toLowerCase();
            let back = card.back.toLowerCase();
            return card.deckId === deckId &&
                matches(lowerFilter, {front, back})
        })
    };
};

const Cards = ({cards, children}) => {
    return (<div className="main">
        {cards.map(card => <Card card={card} key={card.id} />)}
        {children}
    </div>);
};

export default connect(mapStateToProps)(Cards);

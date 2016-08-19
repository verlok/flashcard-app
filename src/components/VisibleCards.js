import React from "react";
import Card from "./Card";
import { connect } from "react-redux";
import fuzzysearch from "fuzzysearch";

const matches = (filter, card) =>
    fuzzysearch(filter, card.front) ||
    fuzzysearch(filter, card.back);

// First argument is state.cards, second is router.params.deckId
const mapStateToProps = ({cards, cardFilter}, {params: {deckId}}) => ({
    cards: cards.filter(card =>
        card.deckId === deckId &&
        matches(cardFilter, card))
});

const Cards = ({cards, children}) => {
    return (<div className="main">
        {cards.map(card => <Card card={card} key={card.id} />)}
        {children}
    </div>);
};

export default connect(mapStateToProps)(Cards);

import React from "react";
import Card from "./Card";
import { connect } from "react-redux";

// First argument is state.cards, second is router.params.deckId
const mapStateToProps = ({cards}, {params: {deckId}}) => ({
    cards: cards.filter(c => c.deckId === deckId)
});

const Cards = ({cards, children}) => {
    return (<div>
        {cards.map(card => <Card card={card} key={card.id} />)}
        {children}
    </div>);
};

export default connect(mapStateToProps)(Cards);

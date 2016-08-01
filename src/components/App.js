import React from 'react';
import Sidebar from "./Sidebar";
import {connect} from "react-redux";

// The 2nd parameter of mapStateToProps is the router object (when using a router)
const mapStateToProps = (props, { params: {deckId} } ) => ({
    deckId
});

const App = ({deckId, children}) => {
    return (<div className="app">
        <Sidebar />
        <h1>Deck {deckId}</h1>
        {children}
    </div>);
};

export default connect(mapStateToProps)(App);
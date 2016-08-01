import React from 'react';
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import {connect} from "react-redux";

// The 2nd parameter of mapStateToProps is the router object (when using a router)
const mapStateToProps = (props, { params: {deckId} } ) => ({
    deckId
});

const App = ({deckId, children}) => {
    return (<div className="app">
        <Toolbar deckId={deckId} />
        <Sidebar />        
        {children}
    </div>);
};

export default connect(mapStateToProps)(App);
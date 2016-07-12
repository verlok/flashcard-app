import React from 'react';
import Sidebar from "./Sidebar";

// Pure component - props.children takes whatever is inside the <App> tag
const App = (props) => {
    return (<div className="app">
        <Sidebar />
        {props.children}
    </div>);
};

export default App;
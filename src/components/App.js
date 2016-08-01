import React from 'react';
import Sidebar from "./Sidebar";

// Pure component - props.children takes whatever is inside the <App> tag
const App = ({children}) => {
    return (<div className="app">
        <Sidebar />
        {children}
    </div>);
};

export default App;
import React from 'react';

// Pure component - props.children takes whatever is inside the <App> tag
const App = (props) => {
    return (<div className="app">
        {props.children}
    </div>);
};

export default App;
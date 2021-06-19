import React from "react";
import {Header} from "./components";
import {Container} from "./containers";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Header/>
            <Container/>
        </React.Fragment>
    );
};

export default App;

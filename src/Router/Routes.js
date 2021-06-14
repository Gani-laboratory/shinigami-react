import React from "react";
import { Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "../Components/Home";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
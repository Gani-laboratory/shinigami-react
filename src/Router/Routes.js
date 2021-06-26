import React, { useContext } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import Delete from "../Components/DeleteUser";
import Edit from "../Components/EditUser";
import Features from "../Components/Features";
import Home from "../Components/Home";
import User from "../Components/ListUser";
import Login from "../Components/Login";
import Navigation from "../Components/Navigation";
import Profile from "../Components/Profile";
import Register from "../Components/Register";
import { GlobalContext } from "../Global/GlobalState";

const Routes = () => {
    const [GlobalState] = useContext(GlobalContext)
    return (
        <Router>
            <Navigation/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    { GlobalState.user === null ? <Login/> : <Redirect to="/profile"></Redirect> }
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/profile">
                    { GlobalState.user !== null ? <Profile/> : <Redirect to="/login"></Redirect> }
                </Route>
                <Route exact path="/user">
                   { GlobalState.user !== null ? <User/> : <Redirect to="/login"></Redirect> }
                </Route>
                <Route exact path="/features">
                    <Features/>
                </Route>
                <Route exact path="/delete">
                   { GlobalState.user !== null ? <Delete/> : <Redirect to="/login"></Redirect> }
                </Route>
                <Route exact path="/edit">
                   { GlobalState.user !== null ? <Edit/> : <Redirect to="/login"></Redirect> }
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
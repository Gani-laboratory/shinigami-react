import React, { useContext } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";
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
                    { (!GlobalState.user || !GlobalState.token || !GlobalState.isLoggedIn) ? <Login/> : <Redirect to="/profile"></Redirect> }
                </Route>
                <Route exact path="/register">
                    { (!GlobalState.user || !GlobalState.token || !GlobalState.isLoggedIn) ? <Register/> : <Redirect to="/profile"></Redirect> }
                </Route>
                <Route exact path="/profile">
                    { (GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) ? <Profile/> : <Redirect to="/login"></Redirect> }
                </Route>
                <Route exact path="/user">
                   { (GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) ? <User/> : <Redirect to="/login"></Redirect> }
                </Route>
                <Route exact path="/features">
                    <Features/>
                </Route>
                <Route exact path="/edit">
                   { (GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) ? <Edit/> : <Redirect to="/login"></Redirect> }
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <Link to="/" className="mx-1">Home</Link>
            <Link to="/login" className="mx-1">Login</Link>
            <Link to="/register" className="mx-1">Register</Link>
            <Link to="/profile" className="mx-1">My Profile</Link>
        </div>
    )
}

export default Navigation;

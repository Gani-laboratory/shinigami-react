import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <Link to="/" className="mx-1">Home</Link>
            <Link to="/login" className="mx-1">Login</Link>
            <Link to="/register" className="mx-1">Register</Link>
            <Link to="/profile" className="mx-1">My Profile</Link>
            <Link to="/user" className="mx-1">List user</Link>
            <Link to="/delete" className="mx-1">Delete user</Link>
            <Link to="/features" className="mx-1">Features</Link>
            <Link to="/edit" className="mx-1">Edit</Link>
        </div>
    )
}

export default Navigation;

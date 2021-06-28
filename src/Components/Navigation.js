import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";

const Navigation = () => {
    const [GlobalState, setGlobalState] = useContext(GlobalContext)
    const logoutHandler = (element) => {
        element.preventDefault()
        Swal.fire({
            text: "Are you sure to logout?",
            showDenyButton: true,
            icon: "question",
        }).then(result => {
            if (result.isConfirmed) {
                setGlobalState({ type: "logout", payload: null })
            }
        })
    }
    return (
        <div>
            <Link to="/" className="mx-1">Home</Link>
            <Link to="/login" className="mx-1">Login</Link>
            <Link to="/register" className="mx-1">Register</Link>

            {(GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) && (
                <>
                    <Link to="/profile" className="mx-1">My Profile</Link>
                    <Link to="/user" className="mx-1">List user</Link>
                    <Link to="/delete" className="mx-1">Delete user</Link>
                    <Link to="/features" className="mx-1">Features</Link>
                    <Link to="/edit" className="mx-1">Edit</Link><button onClick={logoutHandler}>Logout</button>
                </>
            )}
        </div>
    )
}

export default Navigation;

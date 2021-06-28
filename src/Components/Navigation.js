import React, { useContext } from "react";
import env from "react-dotenv";
import { NavLink } from "react-router-dom";
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
        <div className="flex justify-between p-5 box-border bg-red-400">
            <div>
                <h1 className="font-bold text-gray-900 lg:text-xl md:text-lg text-sm">{ env.APP_NAME }</h1>
            </div>
            <div className="flex justify-around text-gray-700 lg:text-lg md:text-sm text-xs">
                <NavLink to="/" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Home</NavLink>
                <NavLink to="/login" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Login</NavLink>
                <NavLink to="/register" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Register</NavLink>

                {(GlobalState.user && GlobalState.token && GlobalState.isLoggedIn) && (
                    <>
                        <NavLink to="/profile" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">My Profile</NavLink>
                        <NavLink to="/user" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">List user</NavLink>
                        <NavLink to="/delete" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Delete user</NavLink>
                        <NavLink to="/features" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Features</NavLink>
                        <NavLink to="/edit" className="lg:px-2.5 px-1 hover:text-gray-800" activeClassName="font-bold">Edit</NavLink>
                        <button className="lg:px-2.5 px-1 hover:text-gray-800" onClick={logoutHandler}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navigation;

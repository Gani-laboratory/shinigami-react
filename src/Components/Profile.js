import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { formatOptions, userCrud } from "../Util/Utilities"

const Profile = () => {
    const [GlobalState, setGlobalState] = useContext(GlobalContext)

    let id = false
    try {
        id = jwtDecode(localStorage.getItem("token"))._id
    } catch {
        setGlobalState({ type: "logout", payload: null })
    }

    const deleteAccount = event => {
        event.preventDefault()
        Swal.fire({
            text: "Are you sure you want to delete your account?",
            showDenyButton: true,
            icon: "warning",
        }).then(result => {
            if (result.isConfirmed) {
                userCrud("delete", {}, id).then(val => {
                    Swal.fire({ title: "Success delete", text: val.data.message, icon: "success" })
                    setGlobalState({ type: "logout", payload: null })
                }).catch(e => {
                    Swal.fire({ title: "Failed to delete account", text: e.msg, icon: "error" })
                })
            }
        })
    }
    return (
        <div className="flex absolute w-full h-full bg-gray-900 text-gray-50">
            <div className="flex flex-col m-auto justify-between p-5 rounded-md bg-gray-700 md:w-1/2 w-11/12 h-1/2">
                <div className="self-center font-bold text-xl">
                    <h1>User Profile Page</h1>
                </div>
                <div className="self-center bg-gray-600 lg:p-5 p-3 rounded">
                    <p className="md:text-lg text-base font-medium">{ GlobalState.user.email }</p>
                    <p className="text-xs font-thin text-gray-300">{ GlobalState.user._id }</p>
                </div>
                <div className="flex justify-around bg-gray-600 lg:p-5 p-3 rounded md:w-8/12 w-11/12 self-center">
                    <div>
                        <p className="text-sm font-medium">Created at</p>
                        <p className="text-xs font-thin">{ new Date(GlobalState.user.createdAt).toLocaleDateString("id", formatOptions()) }</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-right">Updated at</p>
                        <p className="text-xs font-thin">{ new Date(GlobalState.user.updatedAt).toLocaleDateString("id", formatOptions()) }</p>
                    </div>
                </div>
                <div className="flex md:justify-around justify-between bg-gray-600 lg:p-5 p-3 rounded">
                    <Link className="bg-indigo-600 rounded md:p-2 p-1 text-center border border-indigo-700" to="/edit">
                        Edit account
                    </Link>
                    { GlobalState.user.role === "ADMIN" && (
                    <Link className="bg-indigo-600 md:p-2 p-1 text-center border border-indigo-700 rounded" to="/user">
                        <i className="fad fa-users-cog"></i>
                    </Link>
                    ) }
                    <button className="bg-indigo-600 rounded md:p-2 p-1 text-center border border-indigo-700 focus:outline-none" onClick={deleteAccount}>
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile;

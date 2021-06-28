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
        <div className="mt-5">
            <ul className="mt-5 mb-5 mx-auto">
                <li>id: { GlobalState.user._id }</li>
                <li>email: { GlobalState.user.email }</li>
                <li>created at: { new Date(GlobalState.user.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                <li>updated at: { new Date(GlobalState.user.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
            </ul>
            <button className="block focus:outline-none" onClick={deleteAccount}>delete account</button>
            <Link className="block" to="/edit">Edit account</Link>
            <Link className="block" to="/user">List user</Link>
        </div>
    )
}

export default Profile;

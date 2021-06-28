/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud } from "../Util/Utilities"

const Delete = () => {
    let id = false
    const [_, setGlobalState] = useContext(GlobalContext)
    try {
        id = jwtDecode(localStorage.getItem("token"))._id
    } catch {
        setGlobalState({ type: "logout", payload: null })
    }

    const onSubmit = event => {
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
        // rencana nya akan di jadikan pop up ketik tombol di profile di click
        <div className="mt-5">
            <p>Delete user</p>
            <button onClick={onSubmit} type="submit">Delete</button>
        </div>
    )
}

export default Delete;

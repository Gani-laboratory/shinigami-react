/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud } from "../Util/Utilities"

const Delete = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [_, setGlobalState] = useContext(GlobalContext)

    const onSubmit = event => {
        event.preventDefault()
        Swal.fire({
            text: "Are you sure you want to delete your account?",
            showDenyButton: true,
            icon: "warning",
        }).then(result => {
            if (result.isConfirmed) {
                userCrud("delete", {}, user._id).then(val => {
                    Swal.fire({ title: "Success delete", text: val.data.message, icon: "success" })
                    localStorage.removeItem("user")
                    setGlobalState({ type: "setUser", payload: null })
                }).catch(e => {
                    Swal.fire({ title: "Gagal delete", text: e, icon: "error" })
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

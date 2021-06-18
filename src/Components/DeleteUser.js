import React from "react";
import Swal from "sweetalert2";
import { fetchApi } from "../Util/Utilities"

const Delete = () => {
    const onSubmit = e => {
        e.preventDefault()
        fetchApi("/users/60ccb31f32fc5a63ea6bb043", "DELETE").then(val => Swal.fire({ title: "Success delete", text: val.data.message, icon: "success" })).catch(e => Swal.fire({ title: "Gagal delete", text: e, icon: "error" }))
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

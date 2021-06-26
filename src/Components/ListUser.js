import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userCrud, formatOptions } from "../Util/Utilities"

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userCrud("show all").then(val => setUsers(val.data)).catch(() => Swal.fire({
            title: "sorry, we are having problems",
            icon: "info"
        }))
    }, [])
    return (
        <div className="mt-5">
            <p>User page</p>
            {
                users.map(value => {
                    return (
                        <ul key={value._id} className="mt-5 mb-5 mx-auto">
                            <li>id: { value._id }</li>
                            <li>email: { value.email }</li>
                            <li>created at: { new Date(value.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                            <li>updated at: { new Date(value.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default User;

import React, { useEffect, useState } from "react";
import { fetchApi, formatOptions, roles } from "../Util/Utilities"

const Profile = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchApi("/users/60c4622b119068608573b81d", "GET").then(val => setUsers(val.data)).catch(e => setUsers(e.data))
    }, [])
    return (
        <div className="mt-5">
            <p>Profile Page</p>
            <ul className="mt-5 mb-5 mx-auto">
                <li>id: { users._id }</li>
                <li>role: { roles[users.role] }</li>
                <li>username: { users.username }</li>
                <li>email: { users.email }</li>
                <li>created at: { new Date(users.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                <li>updated at: { new Date(users.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
            </ul>
        </div>
    )
}

export default Profile;

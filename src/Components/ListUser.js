// mungkin untuk auth bisa kayak gini => store session id didalam cookie -> mengambil session berdasarkan session id di cookie ? jika di temukan berikan data yang di simpan di sessionya : jika tidak ditemukan delete cookienya
import React, { useEffect, useState } from "react";
import { fetchApi, formatOptions, roles } from "../Util/Utilities"

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchApi("/users", "GET").then(val => setUsers(val.data.users)).catch(e => setUsers(e.data))
    }, [])
    return (
        <div className="mt-5">
            <p>User page</p>
            {
                users.map(v => {
                    return (
                        <ul key={v._id} className="mt-5 mb-5 mx-auto">
                            <li>id: { v._id }</li>
                            <li>role: { roles[v.role] }</li>
                            <li>username: { v.username }</li>
                            <li>email: { v.email }</li>
                            <li>created at: { new Date(v.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                            <li>updated at: { new Date(v.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default User;

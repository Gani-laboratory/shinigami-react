/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud, formatOptions } from "../Util/Utilities"

const User = () => {
    const [users, setUsers] = useState([])
    const [_, setGlobalState] = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        userCrud("show all")
        .then(val => {
            setUsers(val.data)
            setIsLoading(false)
        })
        .catch(e => {
            Swal.fire({
                title: e.msg,
                icon: "error"
            })
            if (e.status === 401) {
                setGlobalState({ type: "logout", payload: null })
            } else if (e.status === 403) history.goBack()
        })
    }, [history, setGlobalState])
    return (
        <div className="mt-5">
            <p>User page</p>
            { isLoading ? (
                <p>Sedang loading</p>
            ) :
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
            <button onClick={history.goBack}>Go back</button>
        </div>
    )
}

export default User;

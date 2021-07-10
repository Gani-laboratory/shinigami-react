/* eslint-disable react-hooks/exhaustive-deps */
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
    const deleteAccount = props => {
        Swal.fire({
            text: "Are you sure you want to delete your account?",
            showDenyButton: true,
            icon: "warning",
        }).then(result => {
            if (result.isConfirmed) {
                userCrud("delete", {}, props).then(val => {
                    Swal.fire({ title: "Success delete", text: val.data.message, icon: "success" })
                }).catch(e => {
                    Swal.fire({ title: "Failed to delete account", text: e.msg, icon: "error" })
                })
            }
        })
    }
    
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
    }, [deleteAccount])

    return (
        <div className="absolute bg-gray-900 text-gray-50 w-full h-full">
            <div className="flex items-start justify-center flex-wrap mx-auto p-5 w-11/12 h-5/6 mt-10 bg-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-thumb-rounded-full hover:scrollbar-thumb-indigo-700">
                { isLoading ? (
                    <p className="my-auto animate-pulse text-xl font-bold">Loading...</p>
                ) :
                    users.map(value => {
                        return (
                            <div className="flex flex-col bg-gray-600 md:p-5 p-3 lg:w-1/3 md:w-1/2 w-11/12 m-2" key={value._id}>
                                <div className="mb-5">
                                    <p className="md:text-base text-sm">{ value.email }</p>
                                    <p className="md:text-sm text-xs font-thin text-gray-300">{ value._id }</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="md:text-base text-sm">Created at</p>
                                        <p className="md:text-sm text-xs font-thin">{ new Date(value.createdAt).toLocaleDateString("id", formatOptions()) }</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="md:text-base text-sm">Updated at</p>
                                        <p className="md:text-sm text-xs font-thin">{ new Date(value.updatedAt).toLocaleDateString("id", formatOptions()) }</p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-5">
                                    <button className="bg-indigo-600 rounded p-1 text-center border border-indigo-700 focus:outline-none"
                                            onClick={() => history.push({
                                                pathname: "/edit",
                                                state: { user: { email: value.email } }
                                            })}
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-indigo-600 rounded p-1 text-center border border-indigo-700 focus:outline-none" onClick={() => deleteAccount(value._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mx-auto mt-5 w-11/12">
                <button className="bg-indigo-600 rounded p-1 text-center border border-indigo-700 focus:outline-none" onClick={history.goBack}>
                    Go back
                </button>
            </div>
        </div>
    )
}

export default User;

import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud } from "../Util/Utilities";

const Edit = () => {
    const location = useLocation()
    console.log(location.state);
    const [GlobalState, setGlobalState] = useContext(GlobalContext)
    const [email, setEmail] = useState(location.state?.user.email || GlobalState.user.email)
    const [pw, setPw] = useState(location.state?.user ? "" : GlobalState.user.password)
    const history = useHistory()

    const onChange = (event) => {
        event.preventDefault()
        const val = event.target.value
        switch (event.target.id) {
            case "email":
                setEmail(val)
                break;
            case "pw":
                setPw(val)
                break;
            default:
                break;
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if (!pw && !email) {
            Swal.fire({
                text: "Please fill in one of the inputs you want to change",
                title: "Failed to edit account",
                icon: "error",
            })
        } else {
            Swal.fire({
                text: "Are you sure to edit?",
                showDenyButton: true,
                icon: "question",
            }).then(result => {
                if (result.isConfirmed) {
                    userCrud("update", { password: pw, email: email }, GlobalState.user._id)
                    .then(res => {
                        Swal.fire({
                            text: res.data.message,
                            title: "Successfully edited account",
                            icon: "success",
                        })
                        setGlobalState({ type: "update", payload: { user: res.data } })
                    }).catch(e => {
                        Swal.fire({
                            text: e.msg,
                            title: "Failed to edit account",
                            icon: "error"
                        })
                        if (e.status === 401) {
                            setGlobalState({ type: "logout", payload: null })
                            history.push("/login")
                        }
                    })

                } else {
                    Swal.fire("Changes are not saved", "", "info")
                }
            })
        }
    }
    return (
        <div className="flex absolute w-full h-full bg-gray-900">
            <div className="flex bg-gray-700 lg:w-1/2 md:w-2/3 w-10/12 m-auto justify-center rounded">
                <div className="flex lg:w-2/3 md:w-10/12 w-11/12 flex-col py-5">
                    <h1 className="font-bold text-center text-lg mb-5 text-gray-50">Edit Page</h1>
                    <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md" type="email" onChange={onChange} value={email} id="email" placeholder="Please input your email" />
                    <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md mr-0.5 mt-1" type="password" onChange={onChange} value={pw} id="pw" placeholder="Please input your password" />
                    <div className="flex justify-between">
                        <button className="w-2/6 mt-5 text-gray-50 bg-indigo-600 rounded p-2 border border-indigo-800 focus:outline-none" onClick={onSubmit}>Edit</button>
                        <button className="w-2/6 mt-5 text-gray-50 bg-indigo-600 rounded p-2 border border-indigo-800 focus:outline-none" onClick={history.goBack}>Go back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;

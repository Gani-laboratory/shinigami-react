import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { userCrud } from "../Util/Utilities";

const Register = () => {
    const [pw, setPw] = useState("")
    const [confirm, setConfirm] = useState("")
    const [email, setEmail] = useState("")
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
            case "confirm":
                setConfirm(val)
                break;
            default:
                break;
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if (!pw || !confirm || !email) {
            Swal.fire({
                text: "All inputs are required",
                title: "Account registration failed",
                icon: "error",
              })
        } else {
            if (pw === confirm) {
                userCrud("create", { password: pw, email })
                    .then(() => {
                        Swal.fire({
                            text: "Your account has been successfully registered",
                            title: "Successfully registered",
                            icon: "success",
                        })
                        history.push("/login")
                    })
                    .catch(e => {
                        Swal.fire({
                            text: e.msg,
                            title: "Account registration failed",
                            icon: "error"
                        })
                    })
            } else {
                Swal.fire({
                    text: "The confirmation password you entered does not match",
                    title: "Account registration failed",
                    icon: "error",
                })
            }
        }
    }
    return (
        <div className="flex absolute w-full h-full bg-gray-900">
            <div className="flex bg-gray-700 lg:w-1/2 md:w-2/3 w-10/12 m-auto justify-center rounded">
                <div className="flex lg:w-2/3 md:w-10/12 w-11/12 flex-col py-5">
                    <h1 className="font-bold text-center text-lg mb-5 text-gray-50">Register Page</h1>
                    <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md" type="email" onChange={onChange} value={email} id="email" placeholder="email"/>
                    <div className="flex mt-1">
                        <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md mr-0.5" type="password" onChange={onChange} value={pw} id="pw" placeholder="password"/>
                        <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md ml-0.5" type="password" onChange={onChange} value={confirm} id="confirm" placeholder="confirm password"/>
                    </div>
                    <button className="self-end w-2/6 mt-5 text-gray-50 bg-indigo-600 rounded p-2 border border-indigo-800 focus:outline-none" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;

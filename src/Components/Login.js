/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
import { fetchApi } from "../Util/Utilities";
import jwtDecode from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [_, setGlobalState] = useContext(GlobalContext)
    const history = useHistory();

    const onChange = (event) => {
        event.preventDefault()
        const val = event.target.value
        switch (event.target.id) {
            case "email":
                setEmail(val)
                break;
            case "password":
                setPassword(val)
                break;
            default:
                break;
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
        if (!email || !password) {
            Swal.fire({
                text: "All inputs are required",
                title: "Login failed",
                icon: "error",
              })
        } else {
            fetchApi("/auth/login", "POST", {
                data: JSON.stringify({ email, password })
            }, { "Content-Type": "application/json" }).then(res => {
                const token = res.data.token
                const id = jwtDecode(token)._id
                setGlobalState({ type: "preLogin", payload: { token } })
                fetchApi(`/user/${id}`, "GET").then(res => {
                    setGlobalState({ type: "login", payload: { user: { ...res.data, password }, isLoggedIn: true, token } })
                    Swal.fire({
                        text: res.data.message,
                        title: "Berhasil Login",
                        icon: "success",
                    })
                    history.push("/profile")
                }).catch(e => {
                    Swal.fire({
                        text: e.response?.data.message || "Sorry, we are having a little problem",
                        title: "Login failed",
                        icon: "error"
                    })
                })
            }).catch(e => {
                setEmail("")
                setPassword("")
                Swal.fire({
                    text: e.response?.data.message || "Sorry, we are having a little problem",
                    title: "Login failed",
                    icon: "error"
                })
            })
        }
    }
    
    return (
        <div className="flex absolute w-full h-full bg-gray-900">
            <div className="flex bg-gray-700 lg:w-1/2 md:w-2/3 w-10/12 m-auto justify-center rounded">
                <div className="flex lg:w-2/3 md:w-10/12 w-11/12 flex-col py-5">
                    <h1 className="font-bold text-center text-lg mb-5 text-gray-50">Login Page</h1>
                    <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md" type="email" onChange={onChange} value={email} id="email" placeholder="Please input your email" />
                    <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:pl-7 md:pl-5 pl-3 lg:pr-12 md:pr-9 pr-6 sm:text-sm border-gray-300 rounded-md mr-0.5 mt-1" type="password" onChange={onChange} value={password} id="password" placeholder="Please input your password" />
                    <button className="self-center w-2/6 mt-5 text-gray-50 bg-indigo-600 rounded p-2 border border-indigo-800 focus:outline-none" onClick={onSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;

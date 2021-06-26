/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { GlobalContext } from "../Global/GlobalState";
import { fetchApi } from "../Util/Utilities";

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
                text: "Semua input wajib diisi",
                title: "ERROR",
                icon: "error",
              })
        } else {
            fetchApi("/auth/login", "POST", {
                data: JSON.stringify({ email, password })
            }, { "Content-Type": "application/json" }).then(v => {
                fetchApi(`/user/${v.data.id}`, "GET").then(val => {
                    const payload = { ...val.data, role: undefined, password: undefined, __v: undefined }
                    setGlobalState({ type: "setUser", payload })
                    localStorage.setItem("user", JSON.stringify(payload)) 
                    history.push("/profile")
                })
                Swal.fire({
                    text: v.data.message,
                    title: "Berhasil Login",
                    icon: "success",
                })
            }).catch(e => {
                setEmail("")
                setPassword("")
                Swal.fire({
                    text: e.response.data.message,
                    title: "ERROR",
                    icon: "error"
                })
            })
        }
    }
    
    return (
        <div className="mt-5">
            <p>Login Page</p>
            <input onChange={onChange} value={email} id="email" placeholder="Please input your email" />
            <input type="password" onChange={onChange} value={password} id="password" placeholder="Please input your password" />
            <button type="submit" onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login;

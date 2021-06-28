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
                    setGlobalState({ type: "login", payload: { user: res.data, isLoggedIn: true, token } })
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
        <div className="mt-5">
            <p>Login Page</p>
            <input onChange={onChange} value={email} id="email" placeholder="Please input your email" />
            <input type="password" onChange={onChange} value={password} id="password" placeholder="Please input your password" />
            <button type="submit" onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login;

import React, { useState } from "react";
import Swal from "sweetalert2";
import { fetchApi } from "../Util/Utilities";

const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const onChange = (event) => {
        event.preventDefault()
        const val = event.target.value
        switch (event.target.id) {
            case "name":
                setName(val)
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
        if (!name || !password) {
            Swal.fire({
                text: "Semua input wajib diisi",
                title: "Gagal Login",
                icon: "error",
              })
        } else {
            fetchApi("/login", "POST", {
                data: JSON.stringify({ name, password })
            }, { "Content-Type": "application/json" }).then(v => {
                Swal.fire({
                    text: v.data.message,
                    title: "Berhasil Login",
                    icon: "success",
                })
            }).catch(e => {
                Swal.fire({
                    text: e,
                    title: "Gagal login",
                    icon: "error"
                })
            })
        }
    }
    return (
        <div className="mt-5">
            <p>Login Page</p>
            <input onChange={onChange} value={name} id="name" placeholder="Please input your username or email" />
            <input type="password" onChange={onChange} value={password} id="password" placeholder="Please input your password" />
            <button type="submit" onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login;

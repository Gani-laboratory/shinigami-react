import React, { useState } from "react";
import Swal from "sweetalert2";
import { fetchApi } from "../Util/Utilities";

const Edit = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [confirm, setConfirm] = useState("")
    
    const onChange = (event) => {
        event.preventDefault()
        const val = event.target.value
        switch (event.target.id) {
            case "username":
                setUsername(val)
                break;
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
        if (!username || !pw || !confirm || !email) {
            Swal.fire({
                text: "Semua input wajib diisi",
                title: "Gagal Edit",
                icon: "error",
              })
        } else {
            if (pw === confirm) {
                fetchApi("/users/60c4848ce9e6f272497f4c91", "PATCH", {
                    data: JSON.stringify({ username, password: pw, email })
                }, { "Content-Type": "application/json" }).then(v => {
                    Swal.fire({
                        text: v.data.message,
                        title: "Berhasil Edit",
                        icon: "success",
                    })
                }).catch(e => {
                    Swal.fire({
                        text: e,
                        title: "Gagal Edit",
                        icon: "error"
                    })
                })
            } else {
                Swal.fire({
                    text: "Password tidak sama dengan confirm password",
                    title: "Gagal Edit",
                    icon: "error",
                })
            }
        }
    }
    return (
        <div className="mt-5">
            <p>Edit Page</p>
            <input type="text" onChange={onChange} value={username} id="username" placeholder="Please input your username" />
            <input type="email" onChange={onChange} value={email} id="email" placeholder="Please input your email" />
            <input type="password" onChange={onChange} value={pw} id="pw" placeholder="Please input your password" />
            <input type="password" onChange={onChange} value={confirm} id="confirm" placeholder="Please input your confirm password" />
            <button type="submit" onClick={onSubmit}>Edit</button>
        </div>
    )
}

export default Edit;

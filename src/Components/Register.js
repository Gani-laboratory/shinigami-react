import React, { useState } from "react";
import Swal from "sweetalert2";
import { userCrud } from "../Util/Utilities";

const Register = () => {
    const [pw, setPw] = useState("")
    const [confirm, setConfirm] = useState("")
    const [email, setEmail] = useState("")

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
        <div className="mt-5">
            <p>Register Page</p>
            <input type="email" onChange={onChange} value={email} id="email" placeholder="Please input your email" className="block"/>
            <input type="password" onChange={onChange} value={pw} id="pw" placeholder="Please input your password" className="block my-5" />
            <input type="password" onChange={onChange} value={confirm} id="confirm" placeholder="Please input your confirm password" className="block my-5" />
            <button type="submit" onClick={onSubmit}>Register</button>
        </div>
    )
}

export default Register;

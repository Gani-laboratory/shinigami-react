import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud } from "../Util/Utilities";

const Edit = () => {
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [GlobalState, setGlobalState] = useContext(GlobalContext)
    const history = useHistory()

    useEffect(() => {
        setEmail(GlobalState.user.email)
    }, [GlobalState.user.email])

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
                    userCrud("update", { password: pw || GlobalState.user.password, email: email || GlobalState.user.email }, GlobalState.user._id)
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
        <div className="mt-5">
            <p>Edit Page</p>
            <input type="email" onChange={onChange} value={email} id="email" placeholder="Please input your email" />
            <input type="password" onChange={onChange} value={pw} id="pw" placeholder="Please input your password" />
            <button type="submit" onClick={onSubmit}>Edit</button>
        </div>
    )
}

export default Edit;

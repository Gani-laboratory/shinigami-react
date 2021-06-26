import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { GlobalContext } from "../Global/GlobalState";
import { userCrud } from "../Util/Utilities";

const Edit = () => {
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [GlobalState, setGlobalState] = useContext(GlobalContext)

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
        if (!pw || !email) {
            Swal.fire({
                text: "Semua input wajib diisi",
                title: "Gagal Edit",
                icon: "error",
            })
        } else {
            Swal.fire({
                text: "Are you sure to edit?",
                showDenyButton: true,
                icon: "question",
            }).then(result => {
                if (result.isConfirmed) {
                    userCrud("update", { password: pw, email }, GlobalState.user._id)
                    .then(res => {
                        Swal.fire({
                            text: res.data.message,
                            title: "Berhasil Edit",
                            icon: "success",
                        })
                        const payload = { ...res.data, role: undefined, password: undefined, __v: undefined }
                        setGlobalState({ type: "setUser", payload })
                        localStorage.setItem("user", JSON.stringify(payload))
                    }).catch(e => {
                        Swal.fire({
                            text: e,
                            title: "Gagal Edit",
                            icon: "error"
                        })
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

import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Global/GlobalState";
import { fetchApi, formatOptions, roles } from "../Util/Utilities"

const Profile = () => {
    const [GlobalState, setGlobalState] = useContext(GlobalContext)
    useEffect(() => {
        fetchApi("/users/60c4622b119068608573b81d", "GET").then(val => setGlobalState({ type: "setUser", payload: val.data })).catch(e => setGlobalState({ type: "setUser", payload: e.data }))
    }, [setGlobalState])
    return (
        <div className="mt-5">
            <p>Profile Page</p>
            <ul className="mt-5 mb-5 mx-auto">
                <li>id: { GlobalState.user._id }</li>
                <li>role: { roles[GlobalState.user.role] }</li>
                <li>username: { GlobalState.user.username }</li>
                <li>email: { GlobalState.user.email }</li>
                <li>created at: { new Date(GlobalState.user.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                <li>updated at: { new Date(GlobalState.user.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
            </ul>
        </div>
    )
}

export default Profile;

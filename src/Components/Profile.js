import React, { useContext } from "react";
import { GlobalContext } from "../Global/GlobalState";
import { formatOptions } from "../Util/Utilities"

const Profile = () => {
    const [GlobalState] = useContext(GlobalContext)
    return (
        <div className="mt-5">
            <p>Profile Page</p>
            <ul className="mt-5 mb-5 mx-auto">
                <li>id: { GlobalState.user._id }</li>
                <li>email: { GlobalState.user.email }</li>
                <li>created at: { new Date(GlobalState.user.createdAt).toLocaleDateString("id", formatOptions()) }</li>
                <li>updated at: { new Date(GlobalState.user.updatedAt).toLocaleDateString("id", formatOptions()) }</li>
            </ul>
        </div>
    )
}

export default Profile;

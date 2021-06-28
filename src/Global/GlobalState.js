import React, { createContext, useReducer } from "react";

import Reducer from "./Reducer";

// import jwtDecode from "jwt-decode";
// import { userCrud } from "../Util/Utilities";

let initialState = {
    isLoggedIn: false,
    user: null,
    token: null
}

const parse = () => {
    try {
        initialState = localStorage.getItem("user") ? {
            user: JSON.parse(localStorage.getItem("user")),
            token: localStorage.getItem("token"),
            isLoggedIn: true
        } : initialState
    } catch (e) {
        console.log(e)
    }
}
parse()

export const GlobalContext = createContext(initialState)
export const GlobalProvider = (props) => {
    const [GlobalState, setGlobalState] = useReducer(Reducer, initialState)
    return (
        <GlobalContext.Provider value={[GlobalState, setGlobalState]}>
            {props.children}
        </GlobalContext.Provider>
    )
}

// export const useCtxAuth = (token) => {
//     const id = jwtDecode(token)._id
//     const [GlobalState, setGlobalState] = useContext(GlobalContext)

//     useEffect(() => {
//         (async () => {
//             if (!GlobalState.user) {
//                 const res = await userCrud("read", {}, id)
//                 setGlobalState({ type: "setUser", payload: res.data })
//             }
//         })()
//     }, [GlobalState.user, id, setGlobalState])

//     return GlobalState.user;
// }
import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
    user: {}
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider = (props) => {
    const [GlobalState, setGlobalState] = useReducer(Reducer, initialState)
    return (
        <GlobalContext.Provider value={[GlobalState, setGlobalState]}>
            {props.children}
        </GlobalContext.Provider>
    )
}

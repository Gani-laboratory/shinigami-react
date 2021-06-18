const Reducer = (state, action) => {
    switch (action.type) {
        case "setUser":
            return {
                ...state,
                user: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer
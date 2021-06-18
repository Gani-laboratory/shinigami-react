const formatOptions = (options = {}) => {
    return {  weekday: "long", year: "numeric", month: "long", day: "numeric", ...options }
}

export { formatOptions }
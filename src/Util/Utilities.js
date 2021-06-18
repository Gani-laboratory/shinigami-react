import axios from "axios";
import env from "react-dotenv";

const formatOptions = (options = {}) => {
    return {  weekday: "long", year: "numeric", month: "long", day: "numeric", ...options }
}
const fetchApi = (endPoint, method, options = {}) => {
    return axios({
        url: `${env.API_URI}${endPoint}`,
        method,
        headers: {
            "x-apikey": env.API_KEY
        },
        ...options
    })
}
const roles = ["", "owner", "admin", "member"]

export { formatOptions, fetchApi, roles }
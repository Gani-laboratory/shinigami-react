import axios from "axios";
import env from "react-dotenv";

const formatOptions = (opts = {}) => {
    return {  weekday: "long", year: "numeric", month: "long", day: "numeric", ...opts }
}
const fetchApi = (endPoint, method, opts = {}, headerOpts = {}) => {
    return axios({
        url: `${env.API_URI}${endPoint}`,
        method,
        headers: {
            "x-apikey": env.API_KEY,
            ...headerOpts
        },
        ...opts
    })
}
const roles = ["", "owner", "admin", "member"]

export { formatOptions, fetchApi, roles }
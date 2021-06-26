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
            "Authorization": `Bearer ${env.ADMIN_ACCESS_TOKEN}`,
            ...headerOpts
        },
        ...opts
    })
}

const userCrud = (action, data={}, id=0) => {
    try {
        switch (action) {
            case "create":
                return fetchApi("/user", "POST",
                    {
                        data: JSON.stringify(data)
                    },
                    {
                        "Content-type": "application/json"
                    }
                )
            case "read":
                return fetchApi(`/user/${id}`, "GET")
            case "update":
                return fetchApi(`/user/${id}`, "PUT",
                    {
                        data: JSON.stringify(data)
                    },
                    {
                        "Content-type": "application/json"
                    }
                )
            case "delete":
                return fetchApi(`/user/${id}`, "DELETE")
                
            default:
                return fetchApi("/user", "GET")
        }
    } catch (e) {
        throw e.response.data.message
    }
}

export { formatOptions, fetchApi, userCrud }

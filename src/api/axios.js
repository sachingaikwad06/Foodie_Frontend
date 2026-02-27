import axios from "axios";


const api = axios.create({
    baseURL: "https://foodie-application-1.onrender.com/api"
});

//attach jwt token automatically to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
) 

export default api;
import axios from "axios";

// axios instance to make api call
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

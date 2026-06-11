import axios from "axios";
import { type CustomAxiosRequestConfig } from "./axiosInterceptor";


const api = axios.create({
    baseURL: "http://localhost:8081", // user 서버
    withCredentials: true
});

export const getToken = async () => {
   await api.post(`/users/token`, {
    _retry: true
  } as CustomAxiosRequestConfig);
}

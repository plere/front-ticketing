import axios from "axios";
import type { GetMeResponse } from "./type/GetMeResponse";
import { setupInterceptors, type CustomAxiosRequestConfig } from "./axiosInterceptor";

const api = setupInterceptors(
  axios.create({
    baseURL: "http://localhost:8081", // user 서버
    withCredentials: true
}));

export const getMeApi = async (): Promise<GetMeResponse> => {
  const response = await api.get<{body: GetMeResponse}>(`/users/me`, {
    handlers: [{
     status: 401,
     handler: (error) => Promise.reject(error) 
    }]
    } as CustomAxiosRequestConfig
  );

  return response.data.body;
};

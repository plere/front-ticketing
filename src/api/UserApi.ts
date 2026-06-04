import axios from "axios";
import type { GetMeResponse } from "./type/GetMeResponse";
import { setupInterceptors } from "./axiosInterceptor";

const api = setupInterceptors(
  axios.create({
    baseURL: "http://localhost:8081", // user 서버
    withCredentials: true
}));

export const getMeApi = async (): Promise<GetMeResponse> => {
  const response = await api.get<{body: GetMeResponse}>(`/users/me`);
  console.log("call getme")

  return response.data.body;
};

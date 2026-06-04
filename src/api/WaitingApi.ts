import axios from "axios";
import { setupInterceptors } from "./axiosInterceptor";
import type { WaitingToken } from "./type/WaitingTokenResponse";

const api = setupInterceptors(axios.create({
  baseURL: "http://localhost:8082", // Spring 서버
  withCredentials: true
}));

export const getWaitingTokenApi = async (concertId: number, roundId: number): Promise<WaitingToken> => {
  const response = await api.get<{body: WaitingToken}>(`/waiting-token/concerts/${concertId}/rounds/${roundId}`);

  return response.data.body;
};

export const getPositionByWaitingTokenApi = async (waitingToken: WaitingToken): Promise<number> => {
  const response = await api.get<{body: number}>(`/waiting-token/position/concerts`, {
    params: waitingToken
  });

  return response.data.body;
};
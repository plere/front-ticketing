import axios from "axios";
import type { GetAllConcertPageResponse } from "./type/GetAllConcertResponse";
import type { GetConcertDetailResponse } from "./type/GetConcertDetailResponse";
import type { GetEmptySeatByRoundIdResponse } from "./type/GetEmptySeatByRoundIdResponse";
import type { GetCurrentSeatResponse } from "./type/GetCurrentSeatResponse";

const api = axios.create({
  baseURL: "http://localhost:8080", // Spring 서버
});

export const getAllConcertApi = async (page:number, size: number, name?: string): Promise<GetAllConcertPageResponse> => {
  const response = await api.get<{body: GetAllConcertPageResponse}>(`/concerts`, {
    params: {
      "pageable.page": page,
      "pageable.limit": size,
      name: name
    }
  });

  return response.data.body;
};

export const getConcertDetailApi = async (id: number): Promise<GetConcertDetailResponse> => {
  const response = await api.get<{body: GetConcertDetailResponse}>(`/concerts/${id}`);

  return response.data.body;  
};

export const getEmptySeatByRoundIdApi = async (id: number): Promise<GetEmptySeatByRoundIdResponse[]> => {
  const response = await api.get<{body: {emptySeats: GetEmptySeatByRoundIdResponse[]}}>(`/concerts/rounds/${id}/seats/empty`);

  return response.data.body.emptySeats;  
};

export const getCurrentSeatApi = async (roundId: number): Promise<GetCurrentSeatResponse> => {
  const response = await api.get<{body: GetCurrentSeatResponse}>(`/concerts/rounds/${roundId}/seats`);

  return response.data.body;
};

export const testConcertApi = async () => {
  await api.post(`/internal/concerts/seats`, {
    seatIds: [...new Set([46,47,48])]
  });
};
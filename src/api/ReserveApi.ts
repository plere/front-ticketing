import axios from "axios";
import { setupInterceptors, type CustomAxiosRequestConfig } from "./axiosInterceptor";
import { reservationTokenStore } from "../stores/reservationTokenStore";
import { JsonToUrlEncoding } from "../util/JsonToUrlEncdoing";

const api = setupInterceptors(
  axios.create({
    baseURL: "http://localhost:8083", // Spring 서버
    withCredentials: true
}));


type TempReservation = {
  id: number, 
  userId: number,
  concertId: number,
  roundId: number,
  seats: number[]
};

type readyReservationPayRes = {
  orderId: string,
  orderName: string,
  amount: number
}

export const createTempReservationApi = async (concertId: number, roundId: number, seatIds: number[]): Promise<TempReservation> => {
  const response = await api.post<{body: TempReservation}>(`/reservation/temp/concerts`, {
    concertId,
    roundId,
    seatIds
  }, {
    handlers: [{
      status: 409,
      handler: (error) => Promise.reject(error) 
    }],
    customHeaders: [{
      name: 'reservation-token',
      value: () => JsonToUrlEncoding(reservationTokenStore.getState().reservationToken)
    }]
  } as CustomAxiosRequestConfig);

  return response.data.body;
};

export const getTempReservationApi = async (concertId: number, roundId: number): Promise<TempReservation> => {
  const response = await api.get<{body: TempReservation}>(`/reservation/temp/concerts/${concertId}/rounds/${roundId}`);

  return response.data.body;
};

export const readyReservationPay = async (): Promise<void> => {
  await api.get<{body: readyReservationPayRes}>(`/reservation/payment/1`);
}
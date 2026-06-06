import axios from "axios";
import { setupInterceptors, type CustomAxiosRequestConfig } from "./axiosInterceptor";

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
    }]
  } as CustomAxiosRequestConfig);

  return response.data.body;
};

export const getTempReservation = async (): Promise<void> => {
  const response = await api.get<{body: TempReservation}>(`/concerts/6/rounds/13`);

  console.log("return:")
  console.log(response.data.body);
};

export const readyReservationPay = async (): Promise<void> => {
  await api.get<{body: readyReservationPayRes}>(`/reservation/payment/1`);
}
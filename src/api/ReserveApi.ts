import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083", // Spring 서버
  withCredentials: true
});


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

export const createTempReservationApi = async (): Promise<void> => {
  const body = {
    concertId: 6,
    roundId: 13,
    seatIds: [
      51,52
    ]
  };

  await api.post(`/reservation/temp/concerts`, body);
};

export const getTempReservation = async (): Promise<void> => {
  const response = await api.get<{body: TempReservation}>(`/concerts/6/rounds/13`);

  console.log("return:")
  console.log(response.data.body);
};

export const readyReservationPay = async (): Promise<void> => {
  await api.get<{body: readyReservationPayRes}>(`/reservation/payment/1`);
}
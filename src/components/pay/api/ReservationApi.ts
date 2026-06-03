import axios from "axios";
import type { executePaymentRequest, PayInfo } from "./type/PayInfo";
import type { CreateResponse } from "../../../common/api/type/CreateResponse";

const api = axios.create({
  baseURL: "http://localhost:8083", // reservation 서버
  withCredentials: true
});

export const getPayInfo = async (id: number): Promise<PayInfo> => {
  const response = await api.get<{body: PayInfo}>(`/reservation/payment/${id}`);

  return response.data.body;
};

export const executePayment = async (body: executePaymentRequest): Promise<CreateResponse> => {
  const response = await api.post<{body: CreateResponse}>(`/reservation/payment`, body);

  return response.data.body;
};
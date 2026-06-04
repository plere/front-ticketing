import { create } from "zustand";
import type { ReservationToken } from "../types/ReservationToken";

export type reservationTokenStoreType = {
  reservationToken: ReservationToken,
  setRservationToken: (reservationToken: ReservationToken) => void
}


export const reservationTokenStore = create<reservationTokenStoreType>((set) => ({
  reservationToken: {
    id: "",
    token: ""
  },
  
  setRservationToken: (reservationToken: ReservationToken) => 
    set({
      reservationToken: {
        id: reservationToken.id, 
        token: reservationToken.token
      }
    })
}));
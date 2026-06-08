import { create } from "zustand";
import type { TempReservation } from "../types/TempReservation";

export type tempReservationStoreType = {
  tempReservation: TempReservation,
  setTempReservation: (tempReservation: TempReservation) => void
}


export const tempReservationTokenStore = create<tempReservationStoreType>((set) => ({
  tempReservation: {
    id: 0, 
    userId: 0,
    concertId: 0,
    roundId: 0,
    seatIds: []
  },
  
  setTempReservation: (tempReservation: TempReservation) => 
    set({
      tempReservation: {
        id: tempReservation.id, 
        userId: tempReservation.userId,
        concertId: tempReservation.concertId,
        roundId: tempReservation.roundId,
        seatIds: [...tempReservation.seatIds]
      }
    })
}));
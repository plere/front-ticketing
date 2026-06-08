export type TempReservation = {
  id: number, 
  userId: number,
  concertId: number,
  roundId: number,
  seatIds: number[]
};
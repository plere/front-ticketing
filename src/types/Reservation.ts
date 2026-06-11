export type Reservation = {
     id: number;
     userId: number;
     paymentKey: String;
     orderId: String;
     concertId: number;
     concertName: String;
     roundId: number;
     amount: String;
    seatIds: Set<number>;
     statu: ReservationStatus;
};

export type ReservationStatus = 
  'TEMP' |
  'EXPIRED' |
  'PAY_REQUESTING' |
  'PAY_EXECUTING' |
  'RESERVED' |
  'PAY_REQUESTING_FAIL' |
  'PAY_REQUESTED' |
  'PAY_EXECUTING_FAIL';

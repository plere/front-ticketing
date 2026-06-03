export type GetConcertDetailResponse = {
  id: number,
  name: string,
  detailInfo: string,
  runningTime: number,
  ticketingStartTime: string,
  placeId: number,
  placeName: string,
  rounds: GetConcertDetailRoundResponse[],
  seatGrades: GetConcertDetailSeatGradeResponse[]
};

export type GetConcertDetailRoundResponse = {
  id: number,
  startDateTime: string,
  sequenceNumber: number
};

export type GetConcertDetailSeatGradeResponse = {
  name: string,
  price: number
};
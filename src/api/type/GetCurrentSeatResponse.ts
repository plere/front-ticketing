export type GetCurrentSeatResponse = {
  grades: GetCurrentSeatGradeResponse[],
  seats: GetCurrentFloorSeatResponse[],
};

export type GetCurrentSeatGradeResponse = {
  gradeName: string,
  price: number,
  emptySeatCount: number
};

export type GetCurrentFloorSeatResponse = {
  floor: number,
  rows: GetCurrentRowSeatResponse[]
};

export type GetCurrentRowSeatResponse = {
  row: number,
  columns: GetCurrentColumnSeatResponse[]
};

export type GetCurrentSeatState = "EMPTY" | "RESERVED";

export type GetCurrentColumnSeatResponse = {
  column: number,
  state: GetCurrentSeatState
};

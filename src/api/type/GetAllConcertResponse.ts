export type GetAllConcertPageResponse = {
  meta: PageMeta,
  items: GetAllConcertResponse[]
};

export type PageMeta = {
  totalItems: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number,
};

export type GetAllConcertResponse = {
  id: number
  name: string,
  openTime: string,
  placeName: string
};
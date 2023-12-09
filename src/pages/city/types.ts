export interface City {
  id: number;
  name: string;
}

export interface CreateHotelPayload {
  name: string;
  description: string;
  price: number;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  images: HotelImage[];
}

export interface EditHotelPayload {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface HotelImage {
  url: string;
  id: number;
}

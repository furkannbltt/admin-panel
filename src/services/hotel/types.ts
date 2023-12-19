export interface HotelDBModel {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  cityId: number;
  city: {
    id: number;
    name: string;
    isActive: boolean;
  };
  price: number;
  images: ImageDBModel[];
}

export interface ImageDBModel {
  imageUrl: string;
  id: string;
}

export interface CreateHotelDBModel {
  name: string;
  description: string;
  price: number;
  cityId: number;
  isActive: true;
}

export interface DeleteHotelDBModel {
  cityId: number;
  hotelId: number;
}

export interface AddImageHotelDBModel {
  file: any;
  hotelId: number;
}

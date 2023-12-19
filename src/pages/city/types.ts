export interface CityModel {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CreateCityModel {
  name: string;
  isActive: true;
}
export interface CreateHotelModel {
  name: string;
  description: string;
  price: number;
  cityId: number;
  isActive: true;
}

export interface DeleteHotelModel {
  cityId: number;
  hotelId: number;
}

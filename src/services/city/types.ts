export interface CityDBModel {
    id: number;
    name: string;
    isActive: boolean;
  }
  
  export interface CreateCityDBModel {
    name: string;
    isActive: true;
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
  
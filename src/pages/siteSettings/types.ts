import { CityModel } from "../city/types";

export interface SiteSettingsModel {
  id: number;
  image: File;
  homePageText: string;
  phoneNumber: string;
  mail: string;
  address: string;
}


export interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  cityId: number;
  city: CityModel;
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
  imageUrl: string;
  id: string;
}

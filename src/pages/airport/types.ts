import { CityModel } from "../city/types";

export interface Airport {
  id: number;
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}


export interface CreateAirport {
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}

export interface AirportFlight {
  id: number;
  startDate: string;
  endDate: string;
  airplaneCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  description: string;
  targetCity: CityModel;
}

export interface CreateAirportFlightPayload {
  airportId:number;
  startDate: string;
  endDate: string;
  airplaneCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  description: string;
  cityId: number;
}
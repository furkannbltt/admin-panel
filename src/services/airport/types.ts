export interface AirportDBModel {
  id: number;
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}

export interface AirportFlightDBModel {
  id: number;
  startDate: string;
  endDate: string;
  airplaneCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
}

export interface CreateAirportDBModel {
  name: string;
  description: string;
  cityId: number;
  isActive: true;
}

export interface CreateAirportFlightDBModel {
  airportId: number;
  startDate: string;
  endDate: string;
  airplaneCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
}

export interface DeleteAirportFlightDBModel {
  airportId: number;
  flightId: number;
}

import { CityModel } from "../city/types";

export interface Terminal {
  id: number;
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}

export interface CreateTerminal {
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}

export interface TerminalVoyage {
  id: number;
  startDate: string;
  endDate: string;
  busCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  description: string;
  targetCity: CityModel;

}

export interface CreateTerminalVoyagePayload {
  startDate: string;
  endDate: string;
  busCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  terminalId: number;
  description: string;
  cityId: number;
}

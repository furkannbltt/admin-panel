import { CityDBModel } from "../city/types";

export interface TerminalDBModel {
  id: number;
  name: string;
  description: string;
  cityId: number;
  isActive: boolean;
}

export interface TerminalVoyageDBModel {
  id: number;
  startDate: string;
  endDate: string;
  busCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  description: string;
  targetCity: CityDBModel;
}

export interface CreateTerminalDBModel {
  name: string;
  description: string;
  cityId: number;
  isActive: true;
}

export interface CreateTerminalVoyageDBModel {
  terminalId: number;
  startDate: string;
  endDate: string;
  busCode: string;
  isActive: boolean;
  travelTime: string;
  price: number;
  description: string;
  cityId: number;
}

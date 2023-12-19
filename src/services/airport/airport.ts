import {
  AirportDBModel,
  AirportFlightDBModel,
  CreateAirportDBModel,
  CreateAirportFlightDBModel,
  DeleteAirportFlightDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getAirports = () => {
  return http.get<any, AirportDBModel[]>(`/airport/getList`);
};

export const getListAirportFlights = (airportId: number) => {
  const queryParams = new URLSearchParams({ airportId: airportId.toString() });
  return http.get<any, AirportFlightDBModel[]>(
    `/airport/getListAirportFlights/?${queryParams}`
  );
};

export const createAirPort = (payload: CreateAirportDBModel) => {
  return http.post<any, BaseResponseModel<AirportDBModel>>(
    `/airport/add`,
    payload
  );
};

export const createAirPortFlight = (payload: CreateAirportFlightDBModel) => {
  return http.post<any, BaseResponseModel<AirportFlightDBModel>>(
    `/airport/addairportFlight`,
    payload
  );
};

export const deleteAirport = (id: number) => {
  return http.delete<any, BaseResponseModel<AirportDBModel>>(
    `/airport/delete/${id}`
  );
};

export const deleteAirportFlight = (payload: DeleteAirportFlightDBModel) => {
  return http.delete<any, BaseResponseModel<AirportDBModel>>(
    `/airport/deleteAirportFlight/${payload.airportId}/${payload.flightId}`
  );
};

export const editAirport = (payload: AirportDBModel) => {
  return http.put<any, BaseResponseModel<AirportDBModel>>(
    "/Airport/update",
    payload
  );
};

export const editFlight = (payload: AirportFlightDBModel) => {
  return http.put<any, BaseResponseModel<AirportFlightDBModel>>(
    "/Airport/updateFlight",
    payload
  );
};

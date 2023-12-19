import {
  TerminalDBModel,
  TerminalVoyageDBModel,
  CreateTerminalDBModel,
  CreateTerminalVoyageDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getTerminals = () => {
  return http.get<any, TerminalDBModel[]>(`/terminal/getListByCityId/218`);
};

export const getListVoyageByTerminalId = (terminalId: number) => {
  return http.get<any, TerminalVoyageDBModel[]>(
    `/terminal/getListVoyageByTerminalId/${terminalId}`
  );
};

export const createTerminal = (payload: CreateTerminalDBModel) => {
  return http.post<any, BaseResponseModel<TerminalDBModel>>(
    `/terminal/add`,
    payload
  );
};

export const createTerminalVoyage = (payload: CreateTerminalVoyageDBModel) => {
  return http.post<any, BaseResponseModel<TerminalVoyageDBModel>>(
    `/terminal/addTerminalVoyage`,
    payload
  );
};

export const deleteTerminal = (id: number) => {
  return http.delete<any, BaseResponseModel<TerminalDBModel>>(
    `/terminal/delete/${id}`
  );
};

export const deleteTerminalVoyage = (voyageId: number) => {
  return http.delete<any, BaseResponseModel<TerminalDBModel>>(
    `/terminal/deleteVoyage/${voyageId}`
  );
};

export const editTerminal = (payload: TerminalDBModel) => {
  return http.put<any, BaseResponseModel<TerminalDBModel>>(
    "/terminal/update",
    payload
  );
};

export const editTerminalVoyage = (payload: TerminalVoyageDBModel) => {
  return http.put<any, BaseResponseModel<TerminalVoyageDBModel>>(
    "/terminal/updateVoyage",
    payload
  );
};

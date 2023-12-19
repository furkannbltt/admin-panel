import {
  CityDBModel,
  CreateCityDBModel,
  DeleteHotelDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getCities = () => {
  return http.get<any, CityDBModel[]>("/city/getList");
};

export const getCity = (id: string) => {
  return http.get<any, BaseResponseModel<CityDBModel>>("/city/getById", {
    params: id,
  });
};

export const createCity = (payload: CreateCityDBModel) => {
  return http.post<any, BaseResponseModel<CityDBModel>>(`/city/add`, payload);
};


export const deleteHotel = (payload: DeleteHotelDBModel) => {
  return http.delete<any, BaseResponseModel<CityDBModel>>(
    `/city/deleteCityHotel/${payload.hotelId}/${payload.cityId}`
  );
};

export const editCity = (payload: CityDBModel) => {
  return http.put<any, BaseResponseModel<CityDBModel>>("/city/update", payload);
};

export const deleteCity = (id: number) => {
  return http.delete<any, BaseResponseModel<CityDBModel>>(`/city/delete/${id}`);
};

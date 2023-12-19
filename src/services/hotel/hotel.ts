import {
  HotelDBModel,
  CreateHotelDBModel,
  DeleteHotelDBModel,
  ImageDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getHotelsByCity = (cityId: number) => {
  return http.get<any, HotelDBModel[]>(`/hotel/getListByCityId/${cityId}`);
};

export const createCityHotel = (payload: CreateHotelDBModel) => {
  return http.post<any, BaseResponseModel<HotelDBModel>>(
    `/city/addCityHotel`,
    payload
  );
};

export const deleteHotel = (payload: DeleteHotelDBModel) => {
  return http.delete<any, BaseResponseModel<HotelDBModel>>(
    `/city/deleteCityHotel/${payload.hotelId}/${payload.cityId}`
  );
};

export const editHotel = (payload: HotelDBModel) => {
  return http.put<any, BaseResponseModel<HotelDBModel>>("/hotel/update", payload);
};

export const addHotelImage = (payload: { images: File[], hotelId: number }) => {
  const formData = new FormData();

  payload.images.forEach((image) => {
    formData.append(`images`, image);
  });

  formData.append("hotelId", payload.hotelId.toString());

  return http.post<any, BaseResponseModel<ImageDBModel[]>>(
    `/hotel/addHotelImageCommand`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const deleteHotelImage = (imageId:string) => {
  return http.delete<any, BaseResponseModel<ImageDBModel>>(
    `/hotel/deleteHotelImage/${imageId}`
  );
};



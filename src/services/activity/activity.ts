import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";
import {
  ActivitiesProgramDBModel,
  ActivitiesVisitDBModel,
  ActivityDBModel,
  AddActivitiesProgramDBModel,
  AddActivitiesVisitDBModel,
  AddImageDBModel,
  CreateActivityDBModel,
  ImageDBModel,
  UpdateActivityDBModel,
} from "./types";

export const getActivities = () => {
  return http.get<any, ActivityDBModel[]>("/activities/getList");
};

export const getCity = (id: number) => {
  return http.get<any, BaseResponseModel<ActivityDBModel>>(
    `/activities/getById?id=${id}`
  );
};

export const createActivity = (payload: CreateActivityDBModel) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("isActive", payload.isActive.toString());
  formData.append("price", payload.price.toString());
  formData.append("cityId", payload.cityId.toString());

  payload.images.forEach((image) => {
    formData.append(`images`, image);
  });

  return http.post<any, BaseResponseModel<ActivityDBModel>>(
    `/activities/add`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateActivity = (payload: UpdateActivityDBModel) => {
  return http.put<any, BaseResponseModel<ActivityDBModel>>(
    `/activities/update`,
    payload
  );
};

export const addActivityVisit = (payload: AddActivitiesVisitDBModel) => {
  return http.post<any, BaseResponseModel<ActivitiesVisitDBModel>>(
    `/activities/activityVisit`,
    payload
  );
};

export const updateActivityVisit = (payload: ActivitiesVisitDBModel) => {
  return http.put<any, BaseResponseModel<ActivitiesVisitDBModel>>(
    `/activities/activityVisit`,
    payload
  );
};

export const deleteActivityVisit = (id: number) => {
  return http.delete<any, BaseResponseModel<ActivitiesVisitDBModel>>(
    `/activities/activityVisit/${id}`
  );
};

export const addActivityProgram = (payload: AddActivitiesProgramDBModel) => {
  return http.post<any, BaseResponseModel<ActivitiesProgramDBModel>>(
    `/activities/activityProgram`,
    payload
  );
};

export const updateActivityProgram = (payload: ActivitiesProgramDBModel) => {
  return http.put<any, BaseResponseModel<ActivitiesProgramDBModel>>(
    `/activities/activityProgram`,
    payload
  );
};

export const deleteActivityProgram = (id: number) => {
  return http.delete<any, BaseResponseModel<ActivitiesProgramDBModel>>(
    `/activities/activityProgram/${id}`
  );
};

export const addActivityImage = (payload: AddImageDBModel) => {
  const formData = new FormData();

  formData.append("activitieId", payload.activitieId.toString());

  payload.images.forEach((image) => {
    formData.append(`images`, image);
  });
  return http.post<any, ImageDBModel[]>(
    `/activities/addActivitiesImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteActivity = (id: number) => {
  return http.delete<any, BaseResponseModel<ActivityDBModel>>(
    `/activities/delete/${id}`
  );
};

export const deleteActivityImage = (imageId: string) => {
  return http.delete<any, BaseResponseModel<ImageDBModel>>(
    `/activities/deleteActivitiesImage/${imageId}`
  );
};

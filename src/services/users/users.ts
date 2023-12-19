import { UserDBModel, UpdateUserDBModel, ChangePasswordDBModel } from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getUsers = () => {
  return http.get<any, UserDBModel[]>("/users/getList");
};

export const getUser = (id: number) => {
  return http.get<any, UserDBModel>(`/users/getById?id=${id}`);
};

export const getUserNotInTheGroup = (groupId: number) => {
  return http.get<any, UserDBModel[]>(`/users/getUserNotInTheGroup/${groupId}`);
};

export const editUser = (payload: UpdateUserDBModel) => {
  return http.put<any, BaseResponseModel<UserDBModel>>(
    "/users/update",
    payload
  );
};

export const editAdminUser = (payload: UpdateUserDBModel) => {
  return http.put<any, BaseResponseModel<UserDBModel>>(
    "/users/adminUserUpdate",
    payload
  );
};

export const deleteUser = (id: number) => {
  return http.delete<any, BaseResponseModel<UserDBModel>>(
    `/users/delete/${id}`
  );
};

export const changePasswordUser = (payload: ChangePasswordDBModel) => {
  return http.put<any, BaseResponseModel<null>>(
    "/users/changePassword",
    payload
  );
};

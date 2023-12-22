import {
  GroupDBModel,
  CreateGroupDBModel,
  UpdateGroupUsersDBModel,
  UpdateGroupClaimDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";
import { UserDBModel } from "../users/types";
import { ClaimDBModel } from "../claims/types";

export const getGroups = () => {
  return http.get<any, GroupDBModel[]>(`/group/getList`);
};

export const getGroupUserList = (groupId: number) => {
  return http.get<any, UserDBModel[]>(`/group/getGroupUserList/${groupId}`);
};

export const getGroup = (id: number) => {
  return http.get<any, GroupDBModel>(`/group/getGroupById/${id}`);
};

export const getGroupClaims = (groupId: number) => {
  return http.get<any, ClaimDBModel[]>(`/group/getGroupClaim/${groupId}`);
};

export const createGroup = (payload: CreateGroupDBModel) => {
  return http.post<any, BaseResponseModel<GroupDBModel>>(`/group/add`, payload);
};

export const updateGroupUsers = (payload: UpdateGroupUsersDBModel) => {
  return http.post<any, BaseResponseModel<UserDBModel[]>>(
    `/group/updateGroupUsers`,
    payload
  );
};

export const updateGroupClaims = (payload: UpdateGroupClaimDBModel) => {
  return http.post<any, BaseResponseModel<ClaimDBModel[]>>(
    `/group/groupClaimsUpdate`,
    payload
  );
};

export const deleteGroup = (id: number) => {
  return http.delete<any, BaseResponseModel<GroupDBModel>>(
    `/group/delete/${id}`
  );
};

export const editGroup = (payload: GroupDBModel) => {
  return http.put<any, BaseResponseModel<ClaimDBModel>>(
    `/group/update`,
    payload
  );
};

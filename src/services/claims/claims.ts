import {
  UpdateUserClaimsDBModel,
  ClaimDBModel,
  DeleteUserClaimDBModel,
} from "./types";
import http from "../../utils/http";
import { BaseResponseModel } from "../../models/models";

export const getClaimsNotInTheUserQuery = (userId: number) => {
  return http.get<any, ClaimDBModel[]>(
    `/operationClaims/OperationClaimsNotInTheUserQuery/${userId}`
  );
};

export const getClaimsInTheUserQuery = (userId: number) => {
  return http.get<any, ClaimDBModel[]>(
    `/Users/GetUserClaimList/${userId}`
  );
};

export const getClaims = () => {
  return http.get<any, ClaimDBModel[]>(`/operationClaims/getList`);
};

export const getClaim = (id: number) => {
  return http.get<any, ClaimDBModel>(`/operationClaims/getById/${id}`);
};

export const getListNotInTheGroup = (groupId: number) => {
  return http.get<any, ClaimDBModel[]>(
    `/operationClaims/getlistNotInTheGroup/${groupId}`
  );
};

export const updateUserClaims = (payload: UpdateUserClaimsDBModel) => {
  return http.post<any, BaseResponseModel<ClaimDBModel>>(
    `/users/userClaimUpdate`,
    payload
  );
};

export const deleteUserClaim = (payload: DeleteUserClaimDBModel) => {
  return http.post<any, BaseResponseModel<ClaimDBModel>>(
    `/users/deleteUserClaim/${payload.userId}/${payload.claimId}`,
    payload
  );
};

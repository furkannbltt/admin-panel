import { BaseResponseModel } from "../../models/models";
import http from "../../utils/http";
import { AuthDto } from "./types";

export const login = async (
  email: string,
  password: string,
): Promise<BaseResponseModel<AuthDto>> => {
  return http.post("auth/login", {
    email,
    password,
  });
};

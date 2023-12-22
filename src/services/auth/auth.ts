import { BaseResponseModel } from "../../models/models";
import http from "../../utils/http";
import { AuthDto } from "./types";

export const login = async (
  email: string,
  password: string
): Promise<BaseResponseModel<AuthDto|null>> => {
  return http.post("auth/login", {
    email,
    password,
  });
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<BaseResponseModel<null>> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);

  return http.post("auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

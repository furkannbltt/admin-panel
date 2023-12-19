import { UserRole } from "../models/models";
import { AuthDto } from "../services/auth/types";

export const getUser = (): AuthDto | null => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const setUser = (param: AuthDto) => {
  localStorage.setItem("userData", JSON.stringify(param));
};

export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const getUserRole = (): UserRole | null => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    return JSON.parse(userData).roles[0];
  } else return null;
};

export default getUser;

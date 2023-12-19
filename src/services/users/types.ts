export interface UserDBModel {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
}

export interface UpdateUserDBModel {
  email: string;
  name: string;
}

export interface ChangePasswordDBModel {
  oldPassword: string;
  newPassword: string;
}
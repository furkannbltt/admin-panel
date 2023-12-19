export interface UserModel {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
}

export interface UpdateUserModel {
  email: string;
  name: string;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}


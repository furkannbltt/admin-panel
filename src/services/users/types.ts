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

export interface SendNotificaitonDBModel {
  userId: string;
  message: string;
  url: string;
  title: string;
}
export interface ChangePasswordDBModel {
  oldPassword: string;
  newPassword: string;
}

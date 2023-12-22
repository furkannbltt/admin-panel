import { UserModel } from "../../pages/users/types";

export interface NotificationModel {
  createDate: string;
  forwardUrl: string;
  id: number;
  isRead: false;
  message: string;
  title: string;
  userId: number;
  users?: UserModel;
}

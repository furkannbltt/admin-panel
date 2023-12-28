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

export interface ClaimModel {
  id: number;
  name: string;
}

export interface UpdateUserClaimsModel {
  userId: number;
  claimId: number[];
}

export interface SendNotificaitonModel {
  userId: string;
  message: string;
  url: string;
  title: string;
}

export interface DeleteUserClaimModel {
  userId: number;
  claimId: number;
}

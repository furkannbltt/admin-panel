export interface ClaimDBModel {
  id: number;
  name: string;
}

export interface UpdateUserClaimsDBModel {
  userId: number;
  claimId: number[];
}

export interface DeleteUserClaimDBModel {
  userId: number;
  claimId: number;
}
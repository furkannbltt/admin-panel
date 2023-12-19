export interface GroupDBModel {
  id: number;
  name: string;
}

export interface CreateGroupDBModel {
  name: string;
}

export interface UpdateGroupUsersDBModel {
  userId: number[];
  groupId: number;
}

export interface UpdateGroupClaimDBModel {
  claimId: number[];
  groupId: number;
}
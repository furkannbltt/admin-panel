export interface GroupModel {
    id: number;
    name: string;
  }
  
  export interface CreateGroupModel {
    name: string;
  }
  
  export interface UpdateGroupUsersModel {
    userId: number[];
    groupId: number;
  }
  
  export interface UpdateGroupClaimModel {
    claimId: number[];
    groupId: number;
  }
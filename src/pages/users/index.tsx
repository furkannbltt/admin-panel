import React, { useState, useEffect, Fragment } from "react";
import UserListTable from "./components/UserListTable";
import EditUserClaimModal from "./components/EditUserClaimModal";
import ContentHeader from "../../components/ContentHeader";
import { UpdateUserClaimsModel, ClaimModel, UserModel } from "./types";
import { deleteUser, getUsers } from "../../services/users/users";
import {
  getClaims,
  getClaimsInTheUserQuery,
  updateUserClaims,
} from "../../services/claims/claims";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [claims, setClaims] = useState<ClaimModel[]>([]);
  const [userClaims, setUserClaims] = useState<ClaimModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedModalUser, setSelectedModalUser] = useState<
    UserModel | undefined
  >(undefined);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      setUsers(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClaims = async () => {
    try {
      setIsLoading(true);
      const response = await getClaims();
      setClaims(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserClaims = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await getClaimsInTheUserQuery(id);
      setUserClaims(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUserClaim = async (editedUser: UserModel) => {
    setSelectedModalUser(editedUser);
    await fetchUserClaims(editedUser.id);
    setVisibleEditModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      const currentUsers = users.filter((user) => user.id !== userId);
      setUsers(currentUsers);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onUserClaims = async (payload: UpdateUserClaimsModel) => {
    try {
      setIsLoading(true);
      await updateUserClaims(payload);
      setSelectedModalUser(undefined);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchUsers();
      await fetchClaims();
    };
    handleLoadComponent();
  }, []);

  return (
    <Fragment>
      <ContentHeader title="Kullanıcılar" />
      <UserListTable
        isLoading={isLoading}
        users={users}
        onEditUserClaims={handleEditUserClaim}
        onDeleteUser={handleDeleteUser}
      />

      {selectedModalUser && (
        <EditUserClaimModal
          userClaims={userClaims}
          allClaims={claims}
          visible={visibleEditModal}
          onCancel={() => {
            setSelectedModalUser(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onUserClaims}
          user={selectedModalUser}
        />
      )}
    </Fragment>
  );
};

export default UsersPage;

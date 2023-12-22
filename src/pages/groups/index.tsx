import React, { useState, Fragment, useEffect } from "react";
import { Button } from "antd";
import GroupListTable from "./components/GroupListTable";
import ContentHeader from "../../components/ContentHeader";
import { PlusOutlined } from "@ant-design/icons";
import {
  GroupModel,
  CreateGroupModel,
  UpdateGroupClaimModel,
  UpdateGroupUsersModel,
} from "./types";
import {
  getGroups,
  createGroup,
  deleteGroup,
  editGroup,
  updateGroupUsers,
  getGroupClaims,
  getGroupUserList,
  updateGroupClaims,
} from "../../services/group/group";
import GroupEditModal from "./components/EditModal";
import GroupCreateModal from "./components/CreateModal";
import { getUsers } from "../../services/users/users";
import { ClaimModel, UserModel } from "../users/types";
import { getClaims } from "../../services/claims/claims";
import EditGroupClaimModal from "./components/EditGroupClaimModal";
import EditGroupUsersModal from "./components/EditGroupUserModal";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<GroupModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [claims, setClaims] = useState<ClaimModel[]>([]);
  const [groupUsers, setGroupUsers] = useState<UserModel[]>([]);
  const [groupClaims, setGroupClaims] = useState<ClaimModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditGroupClaimModal, setVisibleEditGroupClaimModal] =
    useState(false);
  const [visibleEditGroupUsersModal, setVisibleEditGroupUsersModal] =
    useState(false);
  const [selectedModalGroup, setSelectedModalGroup] = useState<
    GroupModel | undefined
  >();

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const response = await getGroups();
      setGroups(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      setUsers(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllClaims = async () => {
    try {
      setIsLoading(true);
      const response = await getClaims();
      setClaims(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupClaims = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await getGroupClaims(id);
      setGroupClaims(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupUsers = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await getGroupUserList(id);
      setGroupUsers(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditGroup = (editedGroup: GroupModel) => {
    setSelectedModalGroup(editedGroup);
    setVisibleEditModal(true);
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      setIsLoading(true);
      await deleteGroup(groupId);
      const currentGroups = groups.filter((group) => group.id !== groupId);
      setGroups(currentGroups);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateGroup = async (newGroup: CreateGroupModel) => {
    try {
      setIsLoading(true);
      const response = await createGroup(newGroup);
      setGroups([...groups, response.data]);
      setVisibleCreateModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onGroupEdit = async (payload: GroupModel) => {
    try {
      setIsLoading(true);
      await editGroup(payload);
      const updatedGroups = groups.map((group) =>
        group.id === payload.id ? { ...group, ...payload } : group
      );
      setGroups(updatedGroups);
      setSelectedModalGroup(undefined);
      setVisibleEditModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateGroupUsers = async (payload: UpdateGroupUsersModel) => {
    try {
      setIsLoading(true);
      await updateGroupUsers(payload);
      setIsLoading(false);
      setVisibleEditGroupUsersModal(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateGroupClaims = async (payload: UpdateGroupClaimModel) => {
    try {
      setIsLoading(true);
      await updateGroupClaims(payload);
      setVisibleEditGroupClaimModal(false)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openEditGroupClaimsModal = async (payload: GroupModel) => {
    setSelectedModalGroup(payload);
    await fetchGroupClaims(payload.id);
    setVisibleEditGroupClaimModal(true);
  };

  const openEditGroupUsersModal = async (payload: GroupModel) => {
    setSelectedModalGroup(payload);
    await fetchGroupUsers(payload.id);
    setVisibleEditGroupUsersModal(true);
  };

  useEffect(() => {
    const handleLoadComponent = async () => {
      await fetchGroups();
      await fetchAllUsers();
      await fetchAllClaims();
    };
    handleLoadComponent();
  }, []);

  return (
    <Fragment>
      <ContentHeader
        title="Gruplar"
        actions={
          <Button
            type="primary"
            onClick={() => setVisibleCreateModal(true)}
            icon={<PlusOutlined />}
          >
            Grup Ekle
          </Button>
        }
      />

      <GroupListTable
        isLoading={isLoading}
        groups={groups}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
        onUpdateGroupUsers={openEditGroupUsersModal}
        onUpdateGroupClaims={openEditGroupClaimsModal}
      />

      {visibleEditModal && (
        <GroupEditModal
          visible={visibleEditModal}
          onCancel={() => {
            setSelectedModalGroup(undefined);
            setVisibleEditModal(false);
          }}
          onOk={onGroupEdit}
          initialValues={selectedModalGroup}
        />
      )}

      {visibleCreateModal && (
        <GroupCreateModal
          visible={visibleCreateModal}
          onCancel={() => setVisibleCreateModal(false)}
          onOk={handleCreateGroup}
        />
      )}

      {visibleEditGroupClaimModal && selectedModalGroup && (
        <EditGroupClaimModal
          visible={visibleEditGroupClaimModal}
          onCancel={() => setVisibleEditGroupClaimModal(false)}
          allClaims={claims}
          groupClaims={groupClaims}
          onOk={handleUpdateGroupClaims}
          group={selectedModalGroup}
        />
      )}

      {visibleEditGroupUsersModal && selectedModalGroup && (
        <EditGroupUsersModal
          visible={visibleEditGroupUsersModal}
          onCancel={() => setVisibleEditGroupUsersModal(false)}
          groupUsers={groupUsers}
          allUsers={users}
          onOk={handleUpdateGroupUsers}
          group={selectedModalGroup}
        />
      )}
    </Fragment>
  );
};

export default GroupsPage;

import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm } from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { UserModel } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

interface UserListTableProps {
  isLoading: boolean;
  users: UserModel[];
  onEditUserClaims: (user: UserModel) => void;
  onDeleteUser: (userId: number) => void;
  onSendMessage: (user: UserModel) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({
  isLoading,
  users,
  onEditUserClaims: onEditUser,
  onDeleteUser,
  onSendMessage,
}) => {
  const columns: ColumnsType<UserModel> = [
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="İzinler">
            <Button
              type="default"
              icon={<FontAwesomeIcon icon={faLockOpen} />}
              onClick={() => onEditUser(record)}
            />
          </Tooltip>
          <Tooltip title="Mesaj gönder">
            <Button
              type="default"
              icon={<SendOutlined />}
              onClick={() => onSendMessage(record)}
            />
          </Tooltip>
          <Tooltip title="Sil">
            <Popconfirm
              title="Silmek istediğinizden emin misiniz?"
              onConfirm={() => onDeleteUser(record.id)}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button type="default" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table loading={isLoading} dataSource={users} columns={columns} />;
};

export default UserListTable;

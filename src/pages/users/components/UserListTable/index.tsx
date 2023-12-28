import React, { useContext } from "react";
import { Table, Button, Tooltip, Space, Popconfirm } from "antd";
import { DeleteOutlined, HomeOutlined, SendOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { UserModel } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../context/Auth";
import "./style.scss";
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
  const { userInfo } = useContext(AuthContext);

  const columns: ColumnsType<UserModel> = [
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record.id === userInfo.id ? (
          <span>
            <HomeOutlined /> {text}
          </span>
        ) : (
          text
        ),
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
          {record.id !== userInfo.id && (
            <Tooltip title="Mesaj gönder">
              <Button
                type="default"
                icon={<SendOutlined />}
                onClick={() => onSendMessage(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const rowClassName = (record: UserModel) => {
    return record.id === userInfo.id ? "even-row-class" : "";
  };

  return (
    <Table
      loading={isLoading}
      dataSource={users}
      columns={columns}
      rowClassName={rowClassName}
    />
  );
};

export default UserListTable;

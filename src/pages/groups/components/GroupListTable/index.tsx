import React from "react";
import { Table, Button, Tooltip, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GroupModel } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUserEdit } from "@fortawesome/free-solid-svg-icons";

interface GroupListTableProps {
  isLoading: boolean;
  groups: GroupModel[];
  onEditGroup: (group: GroupModel) => void;
  onDeleteGroup: (groupId: number) => void;
  onUpdateGroupUsers: (group: GroupModel) => void;
  onUpdateGroupClaims: (group: GroupModel) => void;
}

const GroupListTable: React.FC<GroupListTableProps> = ({
  isLoading,
  groups,
  onEditGroup,
  onDeleteGroup,
  onUpdateGroupUsers,
  onUpdateGroupClaims,
}) => {
  const columns: ColumnsType<GroupModel> = [
    {
      title: "Grup Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Tooltip title="Düzenle">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => onEditGroup(record)}
            />
          </Tooltip>
          <Tooltip title="Sil">
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              onConfirm={() => onDeleteGroup(record.id)}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button type="default" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Kullanıcıları Güncelle">
            <Button
              type="dashed"
              onClick={() => onUpdateGroupUsers(record)}
              icon={<FontAwesomeIcon icon={faUserEdit} />}
            ></Button>
          </Tooltip>

          <Tooltip title="İzinleri Güncelle">
            <Button
              type="dashed"
              onClick={() => onUpdateGroupClaims(record)}
              icon={<FontAwesomeIcon icon={faKey} />}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table loading={isLoading} dataSource={groups} columns={columns} />;
};

export default GroupListTable;

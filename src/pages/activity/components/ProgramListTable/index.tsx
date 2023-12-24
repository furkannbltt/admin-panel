import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm, Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { ActivitiesProgramModel } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ProgramListTableProps {
  loading: boolean;
  programs: ActivitiesProgramModel[];
  onEditProgram: (program: ActivitiesProgramModel) => void;
  onDeleteProgram: (id: number) => void;
  onToggleStatus: (program: ActivitiesProgramModel) => void;
}

const ProgramListTable: React.FC<ProgramListTableProps> = ({
  loading,
  programs,
  onDeleteProgram,
  onEditProgram,
  onToggleStatus,
}) => {
  const columns: ColumnsType<ActivitiesProgramModel> = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: ActivitiesProgramModel) => (
        <Switch checked={isActive} onChange={() => onToggleStatus(record)} />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Sil">
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              onConfirm={() => onDeleteProgram(record.id)}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button type="default" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Düzenle">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => onEditProgram(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table loading={loading} dataSource={programs} columns={columns} />;
};

export default ProgramListTable;

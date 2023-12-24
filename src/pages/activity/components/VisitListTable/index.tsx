import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm, Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { ActivitiesVisitModel } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface VisitListTableProps {
  loading: boolean;
  visits: ActivitiesVisitModel[];
  onEditVisit: (visit: ActivitiesVisitModel) => void;
  onDeleteVisit: (id: number) => void;
  onToggleStatus: (visit: ActivitiesVisitModel) => void;
}

const VisitListTable: React.FC<VisitListTableProps> = ({
  loading,
  visits,
  onDeleteVisit,
  onEditVisit,
  onToggleStatus,
}) => {
  const columns: ColumnsType<ActivitiesVisitModel> = [
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
      render: (isActive: boolean, record: ActivitiesVisitModel) => (
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
              onConfirm={() => onDeleteVisit(record.id)}
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
              onClick={() => onEditVisit(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table loading={loading} dataSource={visits} columns={columns} />;
};

export default VisitListTable;

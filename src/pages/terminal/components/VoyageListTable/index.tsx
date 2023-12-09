import React from "react";
import { Table, Button, Switch, Tooltip, Popconfirm, Space } from "antd";
import { TerminalVoyage } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { displayedDateFormat } from "../../../../utils/helper";

interface terminalVoyagesistTableProps {
  terminalVoyages: TerminalVoyage[];
  onEdit: (airport: TerminalVoyage) => void;
  onToggleIsActive: (airportId: number) => void;
  onDelete: (airportId: number) => void;
}

const FlightListTable: React.FC<terminalVoyagesistTableProps> = ({
  terminalVoyages,
  onEdit,
  onToggleIsActive,
  onDelete,
}) => {
  const columns: ColumnsType<TerminalVoyage> = [
    {
      title: "Başlangıç Tarihi",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => displayedDateFormat(date),
    },
    {
      title: "Bitiş Tarihi",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => displayedDateFormat(date),
    },
    {
      title: "Uçak Kodu",
      dataIndex: "airplaneCode",
      key: "airplaneCode",
    },
    {
      title: "Seyahat Süresi",
      dataIndex: "travelTime",
      key: "travelTime",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: TerminalVoyage) => (
        <Switch
          checked={isActive}
          onChange={() => onToggleIsActive(record.id)}
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: TerminalVoyage) => (
        <Space>
          <Tooltip title="Düzenle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Silmek istediğinize emin misiniz?"
            onConfirm={() => onDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Tooltip title="Sil">
              <Button type="default" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return <Table dataSource={terminalVoyages} columns={columns} />;
};

export default FlightListTable;

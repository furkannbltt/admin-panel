import React from "react";
import { Table, Button, Switch, Tooltip, Popconfirm, Space } from "antd";
import { Terminal } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";

interface TerminalListTableProps {
  loading:boolean;
  terminals: Terminal[];
  onEditTerminal: (data: Terminal) => void;
  onToggleIsActive: (data: Terminal) => void;
  onViewTerminalDetails: (data: Terminal) => void;
  onDeleteCity: (id: number) => void;
}

const TerminalListTable: React.FC<TerminalListTableProps> = ({
  loading,
  terminals,
  onEditTerminal,
  onToggleIsActive,
  onViewTerminalDetails,
  onDeleteCity,
}) => {
  const columns = [
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
      render: (isActive: boolean, record: Terminal) => (
        <Switch
          checked={isActive}
          onChange={() => onToggleIsActive(record)}
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: Terminal) => (
        <Space size="middle">
          <Tooltip title="Düzenle">
            <Button
              type="default"
              onClick={() => onEditTerminal(record)}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>

          <Tooltip title="Seferler">
            <Button
              type="primary"
              onClick={() => onViewTerminalDetails(record)}
              icon={<FontAwesomeIcon icon={faBus} />}
            ></Button>
          </Tooltip>

          <Tooltip title="Sil">
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              onConfirm={() => onDeleteCity(record.id)}
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

  return <Table loading={loading} dataSource={terminals} columns={columns} />;
};

export default TerminalListTable;

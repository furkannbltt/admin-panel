import React from "react";
import { Table, Button, Switch, Tooltip, Popconfirm, Space } from "antd";
import { Airport } from "../../types"; // Assuming Airport type is defined in "../../types"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

interface AirportListTableProps {
  airports: Airport[];
  onEditAirport: (airport: Airport) => void;
  onToggleIsActive: (airportId: number) => void;
  onViewAirportDetails: (airport: Airport) => void;
  onDeleteCity: (airportId: number) => void;
}

const AirportListTable: React.FC<AirportListTableProps> = ({
  airports,
  onEditAirport,
  onToggleIsActive,
  onViewAirportDetails,
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
      render: (isActive: boolean, record: Airport) => (
        <Switch
          checked={isActive}
          onChange={() => onToggleIsActive(record.id)}
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: Airport) => (
        <Space size="middle">
          <Tooltip title="Düzenle">
            <Button
              type="default"
              onClick={() => onEditAirport(record)}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>

          <Tooltip title="Uçuşlar">
            <Button
              type="primary"
              onClick={() => onViewAirportDetails(record)}
              icon={<FontAwesomeIcon icon={faPlaneDeparture} />}
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

  return <Table dataSource={airports} columns={columns} />;
};

export default AirportListTable;

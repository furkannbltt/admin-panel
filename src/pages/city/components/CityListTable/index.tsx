import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm, Switch } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { CityModel } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

interface CityListTableProps {
  isLoading:boolean;
  cities: CityModel[];
  onEditCity: (city: CityModel) => void;
  onDeleteCity: (cityId: number) => void;
  onAddHotel: (city: CityModel) => void;
  onViewAllHotels: (city: CityModel) => void;
  onToggleIsActive: (city: CityModel) => void;
}

const CityListTable: React.FC<CityListTableProps> = ({
  isLoading,
  cities,
  onEditCity,
  onDeleteCity,
  onAddHotel,
  onToggleIsActive,
  onViewAllHotels,
}) => {
  const columns: ColumnsType<CityModel> = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: CityModel) => (
        <Switch
          checked={isActive}
          onChange={() => onToggleIsActive(record)}
        />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Düzenle">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => onEditCity(record)}
            />
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
          <Tooltip title="Otel Ekle">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faHotel} />}
              onClick={() => onAddHotel(record)}
            />
          </Tooltip>
          <Tooltip title="Tümünü Gör">
            <Button
              type="default"
              icon={<InfoCircleOutlined />}
              onClick={() => onViewAllHotels(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table loading={isLoading} dataSource={cities} columns={columns} />;
};

export default CityListTable;

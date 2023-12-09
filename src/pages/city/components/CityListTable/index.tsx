import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { City } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

interface CityListTableProps {
  cities: City[];
  onEditCity: (city: City) => void;
  onDeleteCity: (cityId: number) => void;
  onAddHotel: (cityId: number) => void;
  onViewAllHotels: (cityId: number) => void;
}

const CityListTable: React.FC<CityListTableProps> = ({
  cities,
  onEditCity,
  onDeleteCity,
  onAddHotel,
  onViewAllHotels,
}) => {
  const columns: ColumnsType<City> = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
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
              onClick={() => onAddHotel(record.id)}
            />
          </Tooltip>
          <Tooltip title="Tümünü Gör">
            <Button
              type="default"
              icon={<InfoCircleOutlined />} // Detay ikonu
              onClick={() => onViewAllHotels(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table dataSource={cities} columns={columns} />;
};

export default CityListTable;

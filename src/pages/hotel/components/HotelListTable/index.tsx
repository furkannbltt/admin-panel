import React from "react";
import { Table, Tooltip, Button, Popconfirm, Space, Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { Hotel } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

interface HotelTableProps {
  hotels: Hotel[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit: (record: Hotel) => void;
  onToggle: (id: number, isActive: boolean) => void;
  onViewImages: (record: Hotel) => void;
}

const HotelTable: React.FC<HotelTableProps> = ({
  hotels,
  isLoading,
  onDelete,
  onEdit,
  onToggle,
  onViewImages,
}) => {
  const columns: ColumnsType<Hotel> = [
    {
      title: "Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
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
      render: (isActive: boolean, record: Hotel) => (
        <Switch
          checked={isActive}
          onChange={(checked) => onToggle(record.id, checked)}
        />
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
              onConfirm={() => onDelete(record.id)}
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
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Görselleri Görüntüle">
            <Button
              type="default"
              icon={<FontAwesomeIcon icon={faImages} />}
              onClick={() => onViewImages(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={hotels} loading={isLoading} />;
};

export default HotelTable;

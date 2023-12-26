import React from "react";
import { Table, Button, Tooltip, Popconfirm, Space } from "antd";
import { AirportFlight } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { displayedDateFormat } from "../../../../utils/helper";
import { CityModel } from "../../../city/types";

interface AirportFligthListTableProps {
  loading: boolean;
  airportFligths: AirportFlight[];
  onEdit: (flight: AirportFlight) => void;
  onToggleIsActive: (flight: AirportFlight) => void;
  onDelete: (flightId: number) => void;
}

const FlightListTable: React.FC<AirportFligthListTableProps> = ({
  loading,
  airportFligths,
  // onEdit,
  // onToggleIsActive,
  onDelete,
}) => {
  const columns: ColumnsType<AirportFlight> = [
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
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sefer Saati",
      dataIndex: "airplaneCode",
      key: "airplaneCode",
    },
    {
      title: "Hedef Şehir",
      dataIndex: "targetCity",
      key: "targetCity",
      render: (targetCity: CityModel) => targetCity.name,
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
    // {
    //   title: "Durum",
    //   dataIndex: "isActive",
    //   key: "isActive",
    //   render: (isActive: boolean, record: AirportFlight) => (
    //     <Switch
    //       disabled
    //       checked={isActive}
    //       onChange={() => onToggleIsActive(record)}
    //     />
    //   ),
    // },
    {
      title: "",
      key: "actions",
      render: (text: string, record: AirportFlight) => (
        <Space>
          {/* <Tooltip title="Düzenle">
            <Button
              disabled
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip> */}
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
  return (
    <Table loading={loading} dataSource={airportFligths} columns={columns} />
  );
};

export default FlightListTable;

import React from "react";
import { Table, Button, Tooltip, Space, Popconfirm, Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { ActivityModel } from "../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMosque, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { CityModel } from "../../../city/types";

interface ActivityTableListProps {
  isLoading: boolean;
  activities: ActivityModel[];
  onEditActivity: (activity: ActivityModel) => void;
  onDeleteActivity: (activityId: number) => void;
  onViewImages: (activity: ActivityModel) => void;
  onToggleActivityStatus: (activity: ActivityModel) => void;
  onViewVisit: (activity: ActivityModel) => void;
  onViewProgram: (activity: ActivityModel) => void;

}

const ActivityTableList: React.FC<ActivityTableListProps> = ({
  isLoading,
  activities,
  onEditActivity,
  onDeleteActivity,
  onViewImages,
  onToggleActivityStatus,
  onViewVisit,
  onViewProgram
}) => {
  const columns: ColumnsType<ActivityModel> = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
      render: (city: CityModel) => city.name,
    },
    {
      title: "Durum",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: ActivityModel) => (
        <Switch
          checked={isActive}
          onChange={() => onToggleActivityStatus(record)}
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
              onConfirm={() => onDeleteActivity(record.id)}
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
              onClick={() => onEditActivity(record)}
            />
          </Tooltip>
          <Tooltip title="Görselleri Görüntüle">
            <Button
              type="default"
              icon={<FontAwesomeIcon icon={faImages} />}
              onClick={() => onViewImages(record)}
            />
          </Tooltip>
          <Tooltip title="Gezilecek Yerler">
            <Button
              type="default"
              icon={<FontAwesomeIcon icon={faMosque} />}
              onClick={() => onViewVisit(record)}
            />
          </Tooltip>
          <Tooltip title="Program">
            <Button
              type="default"
              icon={<FontAwesomeIcon icon={faNetworkWired} />}
              onClick={() => onViewProgram(record)}
            />
          </Tooltip>
        </Space>
        
      ),
    },
  ];

  return (
    <Table loading={isLoading} dataSource={activities} columns={columns} />
  );
};

export default ActivityTableList;

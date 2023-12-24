import React from "react";
import { Table } from "antd";
import { NotificationModel } from "../../../../components/Notifications/types";
import { UserModel } from "../../types";
import { displayedDateFormat } from "../../../../utils/helper";

interface NotificationListTableProps {
  notifications: NotificationModel[];
}

const NotificationListTable: React.FC<NotificationListTableProps> = ({
  notifications,
}) => {
  const columns = [
    {
      title: "Gönderen",
      dataIndex: "users",
      key: "users",
      render: (users?: UserModel) => {
        if (users) {
          return users.name;
        } else {
          return "Sistem Mesajı";
        }
      },
    },
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mesaj",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Tarih",
      dataIndex: "createDate",
      key: "createDate",
      render: (date: string) => displayedDateFormat(date),
    },
  ];

  return <Table dataSource={notifications} columns={columns} />;
};

export default NotificationListTable;

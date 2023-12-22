import { useCallback, useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Modal, Badge, Button } from "antd";
import * as signalR from "@microsoft/signalr";
import getUser from "../../utils/storageHelper";
import { NotificationModel } from "./types";
import { toast } from "react-toastify";
import "./style.scss";
import NotificationItem from "./NotificationItem";

const NotificationComponent = () => {
  const userInfo = getUser();
  const [notificationList, setNotificationList] = useState<NotificationModel[]>(
    []
  );
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [connection, setConnection] = useState<
    signalR.HubConnection | undefined
  >(undefined);

  const fetchNotifications = useCallback(() => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection
        .invoke("GetNotifications", userInfo?.id.toString())
        .then((notifications) => {
          const unreadNotifications = notifications.filter(
            (notification: NotificationModel) => !notification.isRead
          );
          setNotificationCount(unreadNotifications.length);
          setNotificationList(notifications);
        })
        .catch((err) => console.error(err));
    }
  }, [connection, userInfo?.id]);

  const deleteNotification = (notificationId: number) => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection
        .invoke("DeleteNotification", notificationId.toString())
        .then(() => {
          setNotificationList((prevNotifications) =>
            prevNotifications.filter(
              (notification) => notification.id !== notificationId
            )
          );
          toast.success("Mesajınız silindi!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection
        .invoke("ReadNotification")
        .then((e) => {
          console.log(e);
          // setNotificationList((prevNotifications) =>
          //     prevNotifications.map((notification) =>
          //         notification.id === notificationId
          //             ? { ...notification, isRead: true }
          //             : notification
          //     )
          // );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_BASE_URL}notificationHub`, {
        accessTokenFactory: () => userInfo?.token.accessToken!,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveMessage", (user, message) => {
      newConnection
        .invoke("GetNotifications", userInfo?.id.toString())
        .then((notifications) => {
          const unreadNotifications = notifications.filter(
            (notification: NotificationModel) => !notification.isRead
          );
          setNotificationCount(unreadNotifications.length);
          setNotificationList(notifications);
        })
        .catch((err) => console.error(err));
    });

    setConnection(newConnection);

    return () => {
      if (newConnection.state === signalR.HubConnectionState.Connected) {
        newConnection.stop();
      }
    };
  }, [userInfo?.id, userInfo?.token.accessToken]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", () => {
            fetchNotifications();
          });
          console.log("first");
          fetchNotifications();
        })
        .catch((err) =>
          console.error("Error starting SignalR connection:", err)
        );
    }
  }, [connection, fetchNotifications]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Badge count={notificationCount}>
        <Button icon={<BellOutlined />} onClick={showModal} type="text" />
      </Badge>
      <Modal
        title="Bildirimler"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        width={500}
      >
        {notificationList.map((notification) => (
          <NotificationItem
            key={notification.id}
            data={notification}
            onDelete={deleteNotification}
            onRead={markNotificationAsRead}
          />
        ))}
      </Modal>
    </div>
  );
};

export default NotificationComponent;
